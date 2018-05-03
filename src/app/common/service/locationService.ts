/**
 * Created by huangxuewen on 2018/3/29.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseService} from './baseService';
import {LocationCriteria, Location} from '../entity/Location';
import {DOMAIN_SERVER_URL} from '../constants';
@Injectable()
export class LocationService extends BaseService {

    constructor(private http: Http) {
        super()
    }
    getServiceUrl() {
        return DOMAIN_SERVER_URL;
    }

    getLocationList(page: number) {
        return this.http.get(this.getServiceUrl() + '/location/list?page=' + page, this.getJsonHeaderWithJWT())
            .map(res => res.json()).catch(this.handleError);
    }
    getLocations(locationCriteria: LocationCriteria) {
        return this.http.post(this.getServiceUrl() + '/location/queryList?page=' + locationCriteria.skip ,
            JSON.stringify(locationCriteria) , this.getJsonHeaderWithJWT()).map(res => res.json())
            .catch(this.handleError);
    }
    create(location: Location) {
        return this.http.post(this.getServiceUrl() + '/location/create?parentId=' + location.parent_id , JSON.stringify(location),
            this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError)
    }
    update(locationId: number , location: Location) {
        return this.http.post(this.getServiceUrl() + '/location/update?locationId=' + locationId , JSON.stringify(location),
            this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError)
    }

    getCabinetList(parent_id: number) {
        return this.http.get(this.getServiceUrl() + '/location/CabinetListByPatentId?parentId='+parent_id, this.getJsonHeaderWithJWT())
            .map(res => res.json()).catch(this.handleError);
    }
    // get Simple LocationList{ id,name}
    getSimpleLocationList() {
        return this.http.get(this.getServiceUrl() + '/location/LocationList', this.getJsonHeaderWithJWT())
            .map(res => res.json()).catch(this.handleError);
    }
}
