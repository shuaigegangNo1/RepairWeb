/**
 * Created by huangxuewen on 2018/5/3.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'role'
})
export class RolePipe implements PipeTransform {

    transform(value: number, args?: any): any {
        if (value === 0) {
            return '学生';
        } else if (value === 1) {
            return '教师';
        } else if (value === 2) {
            return '维修工';
        } else if (value === 3) {
            return '管理员'
        } else {
            return '';
        }
    }

}
