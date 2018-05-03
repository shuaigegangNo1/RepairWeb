/**
 * Created by huangxuewen on 2018/3/29.
 */
import {Injectable} from '@angular/core';
import {RequestOptions, Headers, Http, RequestMethod, RequestOptionsArgs} from '@angular/http';
import {BaseService} from './baseService';
import {DOMAIN_SERVER_URL} from '../constants';
@Injectable()
export class LoginService extends BaseService {

    constructor(private http: Http) {
        super()
    }
    getServiceUrl() {
        return DOMAIN_SERVER_URL;
    }
    login(user: any) {
        return this.http.post(this.getServiceUrl() + '/login', JSON.stringify(user), this.getJsonHeaderWithoutJWT())
            .map(res => res.json()).catch(this.handleError)
    }

}
