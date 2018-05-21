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
            return '公寓区';
        } else if (value === 1) {
            return '教学区';
        } else if (value === 2) {
            return '办公场所(室内公共设施)';
        } else if (value === 3) {
            return '室外公共设施';
        } else if (value === 4) {
            return '绿化卫生';
        } else if (value === 5) {
            return '食堂';
        } else if (value === 6) {
            return '其他';
        }else {
            return '';
        }
    }

}
