import { BootScript } from '@mean-expert/boot-script';

const path = require('path');
const fs = require('fs');

@BootScript()
class Root {
  constructor(app: any) {
    var router = app.loopback.Router();

    // print status on root api endpoint
    router.get(app.settings.restApiRoot, app.loopback.status());

    app.use(router);
  }
}

module.exports = Root;
