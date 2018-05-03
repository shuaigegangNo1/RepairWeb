/**
 * Created by huangxuewen on 2018/4/17.
 */
import {BaseCriteria} from './BaseCriteria';
import {BaseModule} from './BaseModule';
export class Equipment extends BaseModule {
    code?: string;
    name?: string;
    batch_no?: string;
    type?: string;
    location_id?: number;
    buy_date?: Date;
    comments?: string;
    pic?: string;
    pic1?: string;
}

export class EquipmentCriteria extends BaseCriteria {
    code: string;
    name = '';
    location_id = '';
}
