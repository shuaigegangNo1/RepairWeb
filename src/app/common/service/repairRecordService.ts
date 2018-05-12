/**
 * Created by huangxuewen on 2018/4/17.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseService} from './baseService';
import {DOMAIN_SERVER_URL} from '../constants';
import {RepairRecord, RepairRecordCriteria} from "../entity/RepairRecord";
@Injectable()
export class RepairRecordService extends BaseService {

    constructor(private http: Http) {
        super()
    }
    getServiceUrl() {
        return DOMAIN_SERVER_URL;
    }

    create(repairId: number, repairRecord: RepairRecord) {
        return this.http.post(this.getServiceUrl() + '/repairRecord/create?repairId=' + repairId , JSON.stringify(repairRecord),
            this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError)
    }

    getRepairRecordList(repairRecordCriteria: RepairRecordCriteria) {
        return this.http.post(this.getServiceUrl() + '/repairRecord/querylist?page=' + repairRecordCriteria.skip, JSON.stringify
        (repairRecordCriteria), this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError);
    }
}
