/**
 * Created by huangxuewen on 2018/4/11.
 */
import {Component, ElementRef, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {OrgChart} from "assets/js/orgchart-es6";

@Component({
    selector: 'app-orgchart',
    templateUrl: './orgChart.component.html',
    styleUrls: ['./orgChart.component.css']
})
export class OrgChartComponent {
    @ViewChild("chartContainer") chartContainer: ElementRef;

    orgchart: OrgChart;
    draggedMode = "sameLevel";
    const
    dataScource = {
    'name': 'Lao Lao',
    'title': 'general manager',
    'info': 1,
    'children': [
        { 'name': 'Bo Miao', 'title': 'department manager' },
        { 'name': 'Su Miao', 'title': 'department manager',
            'children': [
                { 'name': 'Tie Hua', 'title': 'senior engineer' },
                { 'name': 'Hei Hei', 'title': 'senior engineer',
                    'children': [
                        { 'name': 'Pang Pang', 'title': 'engineer' },
                        { 'name': 'Xiang Xiang', 'title': 'UE engineer' }
                    ]
                }
            ]
        },
        { 'name': 'Yu Jie', 'title': 'department manager' },
        { 'name': 'Yu Li', 'title': 'department manager' },
        { 'name': 'Hong Miao', 'title': 'department manager' },
        { 'name': 'Yu Wei', 'title': 'department manager' },
        { 'name': 'Chun Miao', 'title': 'department manager' },
        { 'name': 'Yu Tie', 'title': 'department manager' }
    ]
}
    constructor(protected router: Router,
                public element: ElementRef) {
        setTimeout(() => {
            this.draw(this.dataScource);
        }, 1000);
    }

    draw(dataStructure) {
        this.chartContainer.nativeElement.innerHTML = "";
        this.orgchart = new OrgChart({
            'data': dataStructure,
            'nodeContent': 'title',
            'depth': 4,
            'direction': 't2b',
            'draggable': true,
            'nodeInfo': 'info',
            'mode': this.draggedMode
        });
        this.chartContainer.nativeElement.append(this.orgchart.getChart());
    }




}

