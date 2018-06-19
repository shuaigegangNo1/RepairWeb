/**
 * Created by huangxuewen on 2018/5/11.
 */
import {BaseCriteria} from './BaseCriteria';
import {BaseModule} from './BaseModule';
export class Material extends BaseModule {
    code?: string;
    name?: string;
    size?: string;
    comments?: string;
}

export class MaterialCriteria extends BaseCriteria {
    code ?: string;
    name ?: string;
}
