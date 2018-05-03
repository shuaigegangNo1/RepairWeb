/**
 * Created by huangxuewen on 2018/4/21.
 */
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../common/service/messageService';
import {EquipmentService} from '../../common/service/equipmentService';
import {Equipment} from '../../common/entity/Equipment';
import {FILE_DOWNLOAD_URL, FILE_PATH} from '../../common/constants';
import {FileService} from '../../common/service/fileService';
import { DomSanitizer } from '@angular/platform-browser';
import {Attachment} from '../../common/entity/Attachment';
@Component({
    selector: 'app-upload',
    templateUrl: 'upload.component.html'
})
export class UploadComponent {
    equipment: Equipment = new Equipment();
    isUploading: boolean;
    download_url = FILE_DOWNLOAD_URL;
    files: Array<File>;
    imageUrl: any;
    currFile: File;
    attachment: Attachment = new Attachment();
    constructor(protected router: Router, private messageService: MessageService,
                private equipmentService: EquipmentService, private route: ActivatedRoute,
                private fileService: FileService, private sanitizer: DomSanitizer) {
        this.equipment.id = this.route.snapshot.params['id'];
    }
    importImage(file: any) {
        if (file.target.files.length > 3) {
            this.messageService.pushMessage({title: "选择过多图片", content: "选择图片不能超过4个"});
        } else {
            this.isUploading = true;
            this.fileService.handlerFileUpload(file.target.files).then(
                res => {
                    // TODO this is ugly
                    // this.course.equipment = res.filenames[0] ? res.filenames[0] : "";
                    // this.course.equipment = res.filenames[1] ? res.filenames[1] : "";
                    this.messageService.pushMessage({title: 'Success', content: '上传图片成功', type: 'success'});
                    this.router.navigate(['/equipment/children', this.equipment.location_id]);
                }
            ).then(() => console.log(">>>>>this isUploading",this.isUploading)
                // this.isUploading = false
            );
        }
    }
    selectImage(event: any) {
        this.currFile = event.currentTarget.files[0];
        this.attachment.fileName = this.currFile.name.split('.')[0];
        this.attachment.filePath = FILE_PATH;
        this.attachment.fileFormat = this.currFile.name.split('.')[1];
        this.files = event.target.files;
        this.isUploading =true;
        // this.imageUrl = window.URL.createObjectURL(curFile);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.currFile));
        // this.files.pop(file);
    }
    uploadImage() {
        this.fileService.handlerFileUpload(this.files).then(
            res => {
                // TODO this is ugly
                // this.course.equipment = res.filenames[0] ? res.filenames[0] : "";
                // this.course.equipment = res.filenames[1] ? res.filenames[1] : "";
            }
        ).then(() => {
                console.log(">>>>>have Uploaded>>>>>>")
                this.createAttachment();
        }
        );
    }
    createAttachment() {
        this.attachment.equipment_id = this.equipment.id;
        this.fileService.create(this.attachment).subscribe(
            res => {
                // this.router.navigate(['/equipment/message']);
                this.router.navigate(['/message'],{queryParams:{'message':'成功上传附件!','url':'/equipment'}});
            }
        )
    }

}
