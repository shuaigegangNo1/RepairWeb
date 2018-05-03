/**
 * Created by huangxuewen on 2018/4/2.
 */
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '../../common/entity/Location';
import {MessageService} from '../../common/service/messageService';
import {LocationService} from '../../common/service/locationService';
@Component({
    selector: 'app-location-detail',
    templateUrl: 'location.detail.component.html'
})
export class LocationDetailComponent {
    location: Location = new Location();
    isExperiment: boolean;

    constructor(protected router: Router, private messageService: MessageService,
                private locationService: LocationService, private route: ActivatedRoute) {
        // super(router, messageService);
        this.location.parent_id = this.route.snapshot.params['id'];
        if (this.location.parent_id) {
            this.isExperiment = false;
        } else {
            this.isExperiment = true;
        }
    }
    createLocation() {
        if (this.location.parent_id) {
            this.locationService.create(this.location).subscribe(
                res => {
                    this.messageService.pushMessage({title: 'Success', content: '机柜创建成功', type: 'success'});
                    this.router.navigate(['/location/children', this.location.parent_id]);
                })
        }else {
            this.location.parent_id = '';
            this.locationService.create(this.location).subscribe(
                res => {
                    this.messageService.pushMessage({title: 'Success', content: '机房创建成功', type: 'success'});
                    this.router.navigate(['/location']);
                })
        }
    }
}
