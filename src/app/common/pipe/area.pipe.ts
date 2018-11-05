/**
 * Created by huangxuewen on 2018/5/3.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'area'
})
export class AreaPipe implements PipeTransform {

    transform(value: number, args?: any): any {
        if (value === 10) {
            return '公寓区'; // 物业
        } else if (value === 11) {
            return '图文楼';
        } else if (value === 12) {
            return '教学楼';
        } else if (value === 13) {
            return '工训楼';
        } else if (value === 14) {
            return '后勤综合楼';
        } else if (value === 15) {
            return '专业教学楼';
        } else if (value === 16) {
            return '文体中心';
        } else if (value === 18) {
            return '留学生公寓'; // 曹云峰
        } else if (value === 20) {
            return '室外公共设施'; // 徐雪荣
        } else if (value === 30) {
            return '绿化卫生'; // 叶琳、于茂华
        } else if (value === 40) {
            return '食堂'; // 叶翠云
        } else if (value === 17) {
            return '其他';
        }else {
            return '';
        }
    }

}
