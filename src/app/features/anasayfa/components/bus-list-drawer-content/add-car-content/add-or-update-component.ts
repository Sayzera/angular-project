import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG Modülleri
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

// Servisler ve Diğerleri
import { DrawerService } from '../../../../../services/drawer.service';
import { BusListDrawerComponent } from '../bus-list-drawer-component';
import { BusState, BusService } from '../../../../../services/bus.service';
import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { DatePickerModule } from 'primeng/datepicker';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-or-update-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    IftaLabelModule,
    ButtonModule,
    FieldsetModule,
    DatePickerModule,
  ],
  templateUrl: './add-or-update.component.html',
})
export class AddOrUpdateComponent implements OnInit, OnDestroy {
  type: 'add' | 'update' = 'add';
  vehicle: BusState = {
    id: 0,
    plaka: '',
    mesafe: 0,
    hiz: 0,
    konum: {
      enlem: '',
      boylam: '',
    },
    color: 'green',
    tarih: new Date().toLocaleDateString('tr-TR'),
    adres: '',
    type: 'add',
  };

  private destroy$ = new Subject<void>();

  constructor(
    private drawerService: DrawerService,
    private busService: BusService
  ) {}

  ngOnInit() {
    this.drawerService.drawerState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        if (state.data) {
          this.type = state.data.type;
          if (state.data.id) {
            this.vehicle = { ...state.data, tarih: new Date(state.data.tarih) };
            this.type = this.vehicle.type
          }
        }
      });
  }


  goBackBusList() {
    this.drawerService.openDrawer(BusListDrawerComponent, {});
  }

  saveVehicle() {

    if (this.type === 'add') {
      this.busService.addVehicle({
        ...this.vehicle,
        tarih: new Date().toLocaleDateString('tr-TR'),
        id: new Date().getTime(),
      });
    } else if (this.type === 'update')  {
      this.busService.updateVehicle({
        ...this.vehicle,
        tarih: new Date().toLocaleDateString('tr-TR'),
      })
    }

    this.goBackBusList();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
