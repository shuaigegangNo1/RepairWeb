/**
 * Created by huangxuewen on 2018/5/3.
 */
import {BaseCriteria} from './BaseCriteria';
import {BaseModule} from './BaseModule';
export class Repair extends BaseModule {
    content?: string;
    code?: string;
    area?: number;
    address?: string;
    telephone?: string;
    repair_status?: number;
    material?: string;
    usecount?:number;
    result?: string;
    rate?: string;
    isEvaluate?: string;
    comments?: string;
}

export class RepairCriteria extends BaseCriteria {
    content = '';
    userName?: string;
    sno?: string;
    repair_status?: number;
    area = '';
    isFinish = '';
    isEvaluate = '';
}
