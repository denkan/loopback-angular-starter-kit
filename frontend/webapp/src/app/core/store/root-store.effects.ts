import { PersistedDataEffects } from './persisted-data';
import { UserEffects } from './user';

export const rootEffects = [
  PersistedDataEffects,
  UserEffects,
];
