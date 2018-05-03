import {BaseModule} from './BaseModule';
import {BaseCriteria} from './BaseCriteria';

export class User extends BaseModule {
  username?: string;
  password?: string;
  name?: string;
  email?: string;
  role?: number;
  type: Type;
}

export enum Type {
  admin,
  Dadmin,
  user
}

export class RMUserCriteria extends BaseCriteria {
  name: string;
  email: string;
}
