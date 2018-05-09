/**
 * Created by huangxuewen on 2018/5/3.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'repairStatus'
})
export class RepairStatusPipe implements PipeTransform {

    transform(value: number, args?: any): any {
        if (value === 0) {
            return '未受理';
        } else if (value === 1) {
            return '不予受理';
        } else if (value === 2) {
            return '处理中';
        } else if (value === 3) {
            return '已完成';
        } else {
            return '';
        }
    }

}
