/**
 * Created by huangxuewen on 2018/4/17.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseService} from './baseService';
import {DOMAIN_SERVER_URL} from '../constants';
@Injectable()
export class MaterialService extends BaseService {

    constructor(private http: Http) {
        super()
    }
    getServiceUrl() {
        return DOMAIN_SERVER_URL;
    }

    getMaterialDetail(code: string) {
        return this.http.get(this.getServiceUrl() + '/material/query?code=' + code ,
            this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError)
    }
}
