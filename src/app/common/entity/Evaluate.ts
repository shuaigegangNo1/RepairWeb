/**
 * Created by huangxuewen on 2018/5/11.
 */
import {BaseCriteria} from './BaseCriteria';
import {BaseModule} from './BaseModule';
export class Evaluate extends BaseModule {
    rate?: number;
    workload?: number;
    comments?: string;
}

export class EvaluateCriteria extends BaseCriteria {
    info = '';
    repair_id ?: number;
}
