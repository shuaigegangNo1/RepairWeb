/**
 * Created by huangxuewen on 2018/5/3.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'area'
})
export class AreaPipe implements PipeTransform {

    transform(value: number, args?: any): any {
        if (value === 0) {
            return '宿舍区';
        } else if (value === 1) {
            return '教学区';
        }else {
            return '';
        }
    }

}
