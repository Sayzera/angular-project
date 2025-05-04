import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusService, BusState } from '../../../../../services/bus.service';
import { Subject, takeUntil } from 'rxjs';
import { DrawerService } from '../../../../../services/drawer.service';
import { BusListDrawerComponent } from '../bus-list-drawer-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-delete-car-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './delete-car-component.html',
})
export class DeleteCarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  busState: BusState[] = [];
  selectedBus: BusState | null = null;
  confirmationText: string = '';

  get isConfirmationValid(): boolean {
    return this.confirmationText === this.selectedBus?.plaka;
  }

  constructor(
    private busService: BusService,
    private drawerService: DrawerService
  ) {}

  ngOnInit() {
    this.busService.busState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.busState = state;
      });

    this.drawerService.drawerState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        if (state.data) {
          this.selectedBus = state.data;
        }
      });
  }

  goBackBusList() {
    this.drawerService.openDrawer(BusListDrawerComponent, {});
  }

  deleteVehicle() {
    if (this.selectedBus && this.isConfirmationValid) {
      this.busService.deleteVehicle(this.selectedBus.id);
      this.goBackBusList();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
