/**
 * Created by huangxuewen on 2018/4/17.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseService} from './baseService';
import {Equipment, EquipmentCriteria} from '../entity/Equipment';
import {DOMAIN_SERVER_URL} from '../constants';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class EquipmentService extends BaseService {

    constructor(private http: Http) {
        super()
    }
    getServiceUrl() {
        return DOMAIN_SERVER_URL;
    }

    getEquipmentList(equipmentCriteria: EquipmentCriteria) {
        return this.http.post(this.getServiceUrl() + '/equipment/queryList?page=' + equipmentCriteria.skip, JSON.stringify
            (equipmentCriteria), this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError);
    }
    create(equipment: Equipment) {
        return this.http.post(this.getServiceUrl() + '/equipment/create?locationId=' + equipment.location_id , JSON.stringify(equipment),
            this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError)
    }
    update(equipmentId: number , equipment: Equipment) {
        return this.http.post(this.getServiceUrl() + '/equipment/update?equipmentId=' + equipmentId , JSON.stringify(equipment),
            this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError)
    }

    getChartData(){
        return Observable.of([
            {
                "name": "Germany",
                "value": 40632
            },
            {
                "name": "United States",
                "value": 49737
            },
            // {
            //     "name": "France",
            //     "value": 36745
            // }
        ]);
    }
    getEquipmentChartData() {
        return this.http.get(this.getServiceUrl() + '/equipment/chartJson',
            this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError)
    }
    showDetail(equipmentId:number) {
        return this.http.get(this.getServiceUrl() + '/equipment/detail?equipmentId=' + equipmentId ,
            this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError)
    }
}
