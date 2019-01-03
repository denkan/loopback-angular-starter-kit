/**
 * Shorthands
 */
import * as fromRoot from './root-store.reducers';
import * as fromPersistedData from './persisted-data';
import * as fromPush from './push';
import * as fromRouter from './router';
import * as fromUser from './user';

export {
  fromRoot,
  fromPersistedData,
  fromPush,
  fromRouter,
  fromUser,
};


/**
 * Root stuff
 */
export * from './backend.service';
export * from './root-store.effects';
export * from './root-store.module';
export * from './root-store.services';
