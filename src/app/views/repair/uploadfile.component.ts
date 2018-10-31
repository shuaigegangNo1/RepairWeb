import {Component, OnInit} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {FileService} from "../../common/service/fileService";
import {UPLOAD_MULTI_URL, FILE_PATH} from "../../common/constants";
import {Attachment} from "../../common/entity/Attachment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-upload-file',
    templateUrl: 'uploadfile.component.html',
    styleUrls: ['uploadfile.component.css']
})
export class UploadFileComponent implements OnInit{
    title = '上传维修图片';
    public url:string = UPLOAD_MULTI_URL;
    public uploader:FileUploader= new FileUploader({url: this.url});
    attachment:Attachment =new Attachment();
    repairId:number;
    ngOnInit() {
        this.uploader= new FileUploader({
        url: this.url,
        method: "POST",
        itemAlias: 'file'
    });
        this.uploader.onAfterAddingFile=(file)=>{file.withCredentials=false};
    }
    constructor(protected router: Router,private fileService: FileService,
                private route: ActivatedRoute){
        if (this.route.snapshot.params['id']) {
            this.repairId = this.route.snapshot.params['id'];
        }
    }
    upload(){
        this.uploader.queue[0].onSuccess = (response, status, headers) => {
            if (status == 200) {
                this.createAttachment();
                this.router.navigate(['/message'], {queryParams: {'message': '图片上传成功!', 'url': '/repair'}});
            }else {
            }
        };
        this.uploader.queue[0].upload();
    }

    createAttachment(){
        this.attachment.fileFormat = this.uploader.queue[0].file.name.split('.')[1];
        this.attachment.fileName = this.uploader.queue[0].file.name.split('.')[0];
        this.attachment.filePath = FILE_PATH;
        this.fileService.create(this.repairId,this.attachment).subscribe(res=>
        console.log(">>>res",res.result)
        )
    }
}