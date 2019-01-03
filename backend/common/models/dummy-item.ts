import { Model } from '@mean-expert/model';
/**
 * @module DummyItem
 * @description
 * Write a useful DummyItem Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    myRemoteTest: {
      accepts : [
        { arg: 'param1', type: 'string', required: true },
        { arg: 'ctx', type: 'object', http: { source: 'context' } },
      ],
      returns : { type: 'object', root: true },
      http    : { path: '/test', verb: 'get' }
    }
  }
})

class DummyItem {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('DummyItem: Before Save');
    next();
  }

  // Example Remote Method
  myRemoteTest(param1: string, ctx: any, next: Function) {
    const r = { yourParam: param1 };
    next && next(null, r);
    return r;
  }
}

module.exports = DummyItem;
