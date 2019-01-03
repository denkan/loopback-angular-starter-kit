import { Model } from '@mean-expert/model';
import { groupBy } from 'lodash';
import { NotificationData, GameInterface, MatchInterface, AppUserInterface, GameUserInterface, BetInterface } from '../../../_shared/models';
import { singural } from '../../../_shared/utils';

/**
 * @module PushJobs
 * @description
 * Write a useful PushJobs Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {},
  remotes: {}
})

class PushJobs {
  constructor(public model: any) { }

}

module.exports = PushJobs;
