import { BootScript } from '@mean-expert/boot-script';
import { processArg } from './_utils';

const path = require('path');
const fs = require('fs');

@BootScript()
class DbMigrate {
  app: any;
  models: any;
  datasources: any;

  constructor(app: any) {
    this.app = app;
    this.models = require(path.resolve(__dirname, '../model-config.json'));
    this.datasources = require(path.resolve(__dirname, '../datasources.json'));

    if (processArg('--db-auto-migrate')) {
      this.autoUpdateAll()
        .then(() => this.runScripts())
        .catch(() => this.runScripts())
    }
  }

  autoUpdateOrMigrateAll(migrate = false) {
    const autoFunc = migrate ? 'automigrate' : 'autoupdate';

    return Promise.all(
      Object.keys(this.models).map((key) =>
        new Promise<string>((resolve, reject) => {

          const modelDS = this.models[key].dataSource;
          const appDS = this.app.datasources[this.models[key].dataSource];
          if (typeof modelDS != 'undefined') {
            if (typeof appDS != 'undefined') {
              // run appDS.autoupdate() or appDS.automigrate()
              appDS[autoFunc](key, (err: any) => {
                err ?
                  console.error('[DB-MIGRATE]['+autoFunc+'] FAILED ', key + ':', err) :
                  console.log('[DB-MIGRATE]['+autoFunc+'] ✓', key);
                resolve(key);
              });

            } else resolve(key);
          } else resolve(key);

        })
      )
    )
  }

  autoUpdateAll() { return this.autoUpdateOrMigrateAll(false); }
  autoMigrateAll() { return this.autoUpdateOrMigrateAll(true); }


  runScripts(filePath = './db-scripts.sql', dsName = 'dbMysql1') {
    const ds = this.app.datasources[dsName];
    if (!ds) {
      console.error(`[DB-MIGRATE][runScript] Datasource '${dsName}' not found in`, Object.keys(this.app.datasources));
      return;
    }

    const absFilePath = path.resolve(__dirname, filePath);
    if (!fs.existsSync(absFilePath)) {
      console.error('[DB-MIGRATE][runScript] Script file not found:', absFilePath);
      return;
    }
    const data = fs.readFileSync(absFilePath);
    const scriptContent: string = data.toString();
    const sqlStatements = scriptContent.split(';');

    _runNextSqlStatement();


    function _runNextSqlStatement() {
      if(sqlStatements.length === 0) return _allDone();

      const s = sqlStatements.shift().trim();
      if(!s) return _runNextSqlStatement();

      ds.connector.execute(s, (err, r) => {
        // console.log('[DB-MIGRATE][runScript] Running... ', _ellipsis(_stripSql(s), 40));
        if (err) {
          console.error('[DB-MIGRATE][runScript] FAILED:', err);
          return;
        }
        console.log('[DB-MIGRATE][runScript] ✓', _ellipsis(_stripSql(s), 35));
        return _runNextSqlStatement();
      })
    }
    function _allDone() {
      console.log('[DB-MIGRATE][runScript] ✓ All done!');
    }

    function _ellipsis(str: string, maxLength: number) {
      return str.length <= maxLength ? str : str.substring(0, maxLength) + '...';
    }

    function _stripSql(sql) {
      if (!sql) return sql;

      // remove linebreaks and extra whitespace
      sql = sql.replace(/\n/g, ' ');
      while (sql.indexOf('  ') >= 0) {
        sql = sql.replace(/(\s\s)/g, ' ');
      }

      // remove comments
      sql = sql.replace(/\/\*(.)*\*\//g, '');

      sql = sql.trim();
      return sql;
    }
  }
}

module.exports = DbMigrate;
