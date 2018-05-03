/**
 * Created by huangxuewen on 2018/4/23.
 */
import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../common/service/messageService';
import {EquipmentService} from '../../common/service/equipmentService';
@Component({
    selector: 'app-chart-bar',
    templateUrl: 'chart.component.html'
})
export class BarChartComponent implements OnInit{

    single: any[];
    multi: any[];

    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    showBar: boolean;
    constructor(private equipmentService: EquipmentService) {
        // Object.assign(this, { single })
    }
    ngOnInit() {
        this.getChartData();
    }
    onSelect(event) {
        console.log(event);
    }
    getChartData() {
        this.equipmentService.getEquipmentChartData().subscribe(
            data=> {
                if (data.length>0){
                    this.single = data;
                    this.showBar = true;
                }
            } ,
            err =>{
                console.log(">>>>errr",err)
            }
        );
    }
}
