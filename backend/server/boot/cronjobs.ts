import { BootScript } from '@mean-expert/boot-script';
import * as schedule from 'node-schedule';
import * as _ from 'lodash';

import { processArg } from './_utils';


@BootScript()
class Cronjobs {
  app: any;
  models: any;
  datasources: any;

  constructor(app: any) {
    this.app = app;
    const settings = app.settings || {};

    if (settings.cronjobsEnabled || processArg('--cronjobs')) {
      this.initFromConfig(settings.cronjobs);
    }
  }

  private initFromConfig(cronjobs: CronjobsConfig) {
    if (!cronjobs) {
      console.error('Invalid cronjobs config', cronjobs);
      return; //process.exit(1);
    }

    if (_.isObject(cronjobs)) {
      const keys = _.keys(cronjobs);
      _.forEach(keys, (key) => {
        this.scheduleJob(key, cronjobs[key])
      });
    }
    if (_.isArray(cronjobs)) {
      _.forEach(cronjobs, (val, key) => {
        this.scheduleJob(key, cronjobs[key])
      });
    }
  }

  private scheduleJob(jobId, job) {
    const that = this;

    const logTag = '[cronjob:' + jobId + ']';
    console.log(logTag, 'Initializing...', job);

    job = job || {};
    _setModelAndMethod();

    if (!_validate()) {
      console.log(logTag, 'Invalid job: ', job);
      return false;
    }

    const scheduledJob = schedule.scheduleJob(job.schedule, _runJob);
    return scheduledJob;


    function _validate() {
      let isValid = true;
      isValid = isValid && !!job.schedule;
      isValid = isValid && !!that.app.models[job.model];
      isValid = isValid && (typeof that.app.models[job.model][job.method] === 'function');

      return isValid;
    }
    function _setModelAndMethod() {
      if (!job.model || !job.method && job.modelAndMethod) {
        const mm = (job.modelAndMethod + '.').split('.');
        job.model = mm[0];
        job.method = mm[1];
      }
    }
    function _runJob() {
      const args = job.args || [];
      console.log(logTag, 'Running ' + job.model + '.' + job.method + '(', args, ')');
      that.app.models[job.model][job.method](...args);
    }
  }

}

module.exports = Cronjobs;


interface CronjobConfig {
  model?: string;
  method?: string;
  modelAndMethod?: string;
  args: any[];
}

interface CronjobsConfig {
  [jobName: string]: CronjobConfig;
}
