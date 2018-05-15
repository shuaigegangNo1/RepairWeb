/**
 * Created by huangxuewen on 2018/5/3.
 */
import {BaseCriteria} from './BaseCriteria';
import {BaseModule} from './BaseModule';
export class Repair extends BaseModule {
    content?: string;
    area?: number;
    address?: string;
    repair_status?: number;
    material?: string;
    result?: string;
    rate?: string;
    comments?: string;
}

export class RepairCriteria extends BaseCriteria {
    content = '';
    userName?: string;
    repair_status?: number;
    isFinish = '';
}
