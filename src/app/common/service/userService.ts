/**
 * Created by huangxuewen on 2018/3/30.
 */
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {BaseService} from './baseService';
import {DOMAIN_SERVER_URL} from '../constants';
import {RMUserCriteria} from '../entity/User';
@Injectable()
export class UserService extends BaseService {

    constructor(private http: Http) {
        super()
    }
    getServiceUrl() {
        return DOMAIN_SERVER_URL;
    }
    update(user: any) {
        return this.http.post(this.getServiceUrl() + '/user/updateUser', JSON.stringify(user), this.getJsonHeaderWithJWT())
            .map(res => res.json()).catch(this.handleError)
    }
    create(user: any) {
        return this.http.post(this.getServiceUrl() + '/user/sign-up', JSON.stringify(user), this.getJsonHeaderWithoutJWT())
            .map(res => res.json()).catch(this.handleError)
    }
    delete(id: number) {
        return this.http.get(this.getServiceUrl() + '/user/delete?id=' + id,  this.getJsonHeaderWithJWT())
            .map(res => res.json()).catch(this.handleError)
    }
    getUserList(userCriteria: RMUserCriteria) {
        return this.http.post(this.getServiceUrl() + '/user/querylist?page=' + userCriteria.skip , JSON.stringify(userCriteria) ,
            this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError);
    }
}
