/**
 * Created by huangxuewen on 2018/4/16.
 */
import {BaseCriteria} from './BaseCriteria';
import {BaseModule} from './BaseModule';
export class Location extends BaseModule {
    code?: string;
    name?: string;
    parent_id?: string;
}

export class LocationCriteria extends BaseCriteria {
    code: string;
    name = '';
    parent_id = '';
}
