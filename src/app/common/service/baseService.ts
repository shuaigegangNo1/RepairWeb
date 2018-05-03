/**
 * Created by huangxuewen on 2018/3/29.
 */
import {Observable} from 'rxjs/Rx';
import {RequestOptions, Headers} from '@angular/http';
export abstract class BaseService {
    constructor() {
    }
    protected handleError(error) {
        let errorMessage = error.json().message;
        if (error.json().error) {
            errorMessage += ':' + error.json().error;
        }
        switch (error.status) {
            case 401:
                return Observable.throw('invalid token');
            default:
                return Observable.throw(errorMessage);
        }
    }

    protected getJsonHeaderWithoutJWT() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({headers: headers});
        return options;
    }

    protected getJsonHeaderWithJWT() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const token = localStorage.getItem('token');
        headers.append('Authorization', 'Bearer ' + token)
        const options = new RequestOptions({headers: headers});
        return options;
    }

}
