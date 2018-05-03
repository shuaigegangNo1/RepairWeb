/**
 * Created by huangxuewen on 2018/4/21.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {DOMAIN_SERVER_URL, UPLOAD_MULTI_URL} from '../constants';
import {Attachment, AttachmentCriteria} from '../entity/Attachment';
import {BaseService} from './baseService';


@Injectable()
export class FileService extends BaseService {
    constructor(private http: Http) {
        super()
    }
    getServiceUrl() {
        return DOMAIN_SERVER_URL;
    }
    handlerFileUpload(filesToUpload: Array<File>): Promise<any> {
        return this.makeFileRequest(UPLOAD_MULTI_URL, 'imageFiles', filesToUpload);
    }

    makeFileRequest(url: string, fileName: string, files: Array<File>): Promise<any> {
        return new Promise((resolve, reject) => {
            const formData: any = new FormData();
            const xhr = new XMLHttpRequest();
            const token = localStorage.getItem('token');
            for (let i = 0; i < files.length; i++) {
                // formData.append(fileName, files[i], files[i].name);
                formData.append('file', files[i])
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + token)
            xhr.send(formData);
        });
    }
    create(attachment: Attachment) {
        return this.http.post(this.getServiceUrl() + '/attachment/create?equipmentId=' + attachment.equipment_id , JSON.stringify(attachment),
            this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError)
    }
    getAttachmentList(attachmentCriteria: AttachmentCriteria) {
        return this.http.post(this.getServiceUrl() + '/attachment/queryList?page=' + attachmentCriteria.skip, JSON.stringify
        (attachmentCriteria), this.getJsonHeaderWithJWT()).map(res => res.json()).catch(this.handleError);
    }

    handlerFileDownload(fileName: string) {
        // window.open(this._fileDownloadUrl + "/" + fileName);
    }

}
