/**
 * Created by huangxuewen on 2018/5/3.
 */
import {BaseCriteria} from './BaseCriteria';
import {BaseModule} from './BaseModule';
export class RepairRecord extends BaseModule {
    repair_progress?: string;
}

export class RepairRecordCriteria extends BaseCriteria {
    info = '';
}
