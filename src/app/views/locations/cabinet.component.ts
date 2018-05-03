/**
 * Created by huangxuewen on 2018/4/16.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../common/service/messageService';
import {LocationService} from '../../common/service/locationService';
import {LocationCriteria, Location} from '../../common/entity/Location';
import {ModalDirective} from 'ngx-bootstrap';
import {CustomPaginationComponent} from '../pagination/pagination.component';
import {Subject} from 'rxjs/Subject';
@Component({
    templateUrl: 'cabinet.component.html'
})

export class CabinetComponent extends CustomPaginationComponent implements OnInit {
    cabinetList: Array<any>;
    page  = 0;
    locationCriteria: LocationCriteria = new LocationCriteria();
    f_location: Location = new Location();
    searchStream = new Subject<LocationCriteria>();
    @ViewChild('updateLocationModal') public updateLocationModal: ModalDirective;
    constructor(protected router: Router, protected messageService: MessageService,
                private locationService: LocationService, private route: ActivatedRoute) {
        super(router, messageService);
        this.locationCriteria.parent_id = this.route.snapshot.params['id'];
        this.getLocationList();

    }


    ngOnInit(): void {
        super.ngOnInit();
        this.searchStream
        .debounceTime(300)
        .switchMap(() => this.locationService.getLocations(this.locationCriteria)).subscribe(
        (res) => {
          this.cabinetList = res.locationList.content;
          this.totalItems[0] = res.locationList.totalElements;
          this.resetMaxSize(this.currentTab, this.locationCriteria);
        }
    );
    }

    getLocationList() {
        this.locationService.getLocations(this.locationCriteria).subscribe(res => {
            this.cabinetList = res.locationList.content;
            this.totalItems[0] = res.locationList.totalElements;
            this.resetMaxSize(this.currentTab, this.locationCriteria);
        })
    }
    update(location: Location) {
        this.f_location = location;
        this.updateLocationModal.show();
    }

    pageChanged(event: any) {
        this.locationCriteria.skip = event.page - 1;
        this.searchStream.next(this.locationCriteria);
    }
    create() {
        const id = this.locationCriteria.parent_id;
        this.router.navigate(['/location/create', id]);
    }

    submitLocation() {
        this.locationService.update(this.f_location.id, this.f_location).subscribe(res => console.log('>>>>res>>>>' + JSON.stringify(res)))
        this.updateLocationModal.hide();
        this.messageService.pushMessage({title: 'Success', content: '机柜修改成功', type: 'success'});
    }
    showEquipmentListByLocationId(id: any) {
        this.router.navigateByUrl('/equipment/children/' + id)
    }
    searchCabinetName() {
        this.searchStream.next(this.locationCriteria);
    }
}
