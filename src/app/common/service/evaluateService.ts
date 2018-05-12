/**
 * Created by huangxuewen on 2018/4/17.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseService} from './baseService';
import {DOMAIN_SERVER_URL} from '../constants';
import {Evaluate} from "../entity/Evaluate";
@Injectable()
export class EvaluateService extends BaseService {

    constructor(private http: Http) {
        super()
    }
    getServiceUrl() {
        return DOMAIN_SERVER_URL;
    }

    create(repairId: number, evaluate: Evaluate) {
        return this.http.post(this.getServiceUrl() + '/evaluate/create?repairId=' + repairId , JSON.stringify(evaluate),
            this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError)
    }
    getEvaluateDetail(repairId: number) {
        return this.http.get(this.getServiceUrl() + '/evaluate/detail?repairId=' + repairId ,
            this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError)
    }
    // getRepairRecordList(repairRecordCriteria: RepairRecordCriteria) {
    //     return this.http.post(this.getServiceUrl() + '/repairRecord/querylist?page=' + repairRecordCriteria.skip, JSON.stringify
    //     (repairRecordCriteria), this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError);
    // }
}
