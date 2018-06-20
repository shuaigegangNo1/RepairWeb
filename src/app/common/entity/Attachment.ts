/**
 * Created by huangxuewen on 2018/4/25.
 */
import {BaseCriteria} from './BaseCriteria';
import {BaseModule} from './BaseModule';
export class Attachment extends BaseModule {
    fileName?: string;
    filePath?: string;
    fileFormat?: string;
    repair_id?: number;
}

export class AttachmentCriteria extends BaseCriteria {
    fileName: string;
    repair_id: number;
    code: string;
}
