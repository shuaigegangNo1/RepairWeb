import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from '../../common/service/messageService';
import {LocationService} from '../../common/service/locationService';
import {LocationCriteria, Location} from '../../common/entity/Location';
import {ModalDirective} from 'ngx-bootstrap';
import {CustomPaginationComponent} from '../pagination/pagination.component';
import {Subject} from 'rxjs/Subject';

@Component({
  templateUrl: 'locations.component.html'
})
export class LocationComponent extends CustomPaginationComponent implements OnInit {
  locationList: Array<any>;
  page  = 0;
  locationCriteria: LocationCriteria = new LocationCriteria();
  f_location: Location = new Location();
  searchStream = new Subject<LocationCriteria>();
  @ViewChild('updateLocationModal') public updateLocationModal: ModalDirective;
  constructor(protected router: Router, protected messageService: MessageService,
              private locationService: LocationService) {
    super(router, messageService);
    this.getLocationList()
  }


  ngOnInit(): void {
    super.ngOnInit();
    this.searchStream
        .debounceTime(300)
        .switchMap(() => this.locationService.getLocations(this.locationCriteria)).subscribe(
        (res) => {
          this.locationList = res.locationList.content;
          this.totalItems[0] = res.locationList.totalElements;
          this.resetMaxSize(this.currentTab, this.locationCriteria);
        }
    );
  }

  getLocationList() {
    this.locationService.getLocations(this.locationCriteria).subscribe(res => {
      this.locationList = res.locationList.content;
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
  searchLocationName() {
    this.searchStream.next(this.locationCriteria);
  }
  create() {
    this.router.navigate(['/location/create']);
  }
  showCabinetListByParentId(id: any) {
    // this.router.navigate(['/location/children', id]);
    this.router.navigateByUrl('/location/children/' + id)
  }
  submitLocation() {
    this.locationService.update(this.f_location.id, this.f_location).subscribe(res => console.log('>>>>res>>>>' + JSON.stringify(res)))
    this.updateLocationModal.hide();
    this.messageService.pushMessage({title: 'Success', content: '用户修改成功', type: 'success'});
  }
}
