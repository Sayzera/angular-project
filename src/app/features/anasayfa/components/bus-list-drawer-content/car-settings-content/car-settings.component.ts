import { Component, ViewChild, ElementRef } from '@angular/core';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { AccordionModule, AccordionHeader } from 'primeng/accordion';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { BusService, BusState } from '../../../../../services/bus.service';
import { CommonModule } from '@angular/common';
import { AddOrUpdateComponent } from '../add-car-content/add-or-update-component';
import { DrawerService } from '../../../../../services/drawer.service';
import { Subject, takeUntil } from 'rxjs';
import { DeleteCarComponent } from '../delete-car-content/delete-car-component';

@Component({
  selector: 'app-car-settings',
  standalone: true,
  templateUrl: './car-settings.component.html',
  imports: [
    InputIcon,
    IconField,
    InputTextModule,
    FormsModule,
    MessageModule,
    AccordionModule,
    ContextMenuModule,
    CommonModule,
  ],
})
export class CarSettingsComponent {
  @ViewChild('cm') cm: ContextMenu | undefined;
  items: MenuItem[] = [
    {
      label: 'Araç Ekle',
      icon: 'pi pi-plus',
      command: () => this.addVehicle(),
      id: '1',
    },
    {
      label: 'Araç Sil',
      icon: 'pi pi-trash',
      command: () => this.deleteVehicle(),
      id: '2',
    },
    {
      label: 'Araç Düzenle',
      icon: 'pi pi-pencil',
      command: () => this.editVehicle(),
      id: '3',
    },
  ];

  constructor(private busService: BusService, private drawerService: DrawerService) {}

  busState: BusState[] = [];
  filteredBusState: BusState[] = [];
  search: string = '';
  selectedBusIndex: number = -1;

  selectedContextMenuData: BusState | null = null;
  busData: BusState[] = [];


  private destroy$ = new Subject<void>();


  ngOnInit() {
    this.busService.busState$
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.busState = data;
      this.filterBuses();
    });
  }

  filterBuses() {
    if (!this.search) {
      this.filteredBusState = this.busState;
    } else {
      this.filteredBusState = this.busState.filter((bus) =>
        bus.plaka.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }

  addVehicle() {
    // Araç ekleme işlemi
    this.drawerService.openDrawer(AddOrUpdateComponent, {
      type: 'add',
    });
  }

  deleteVehicle() {
    this.drawerService.openDrawer(DeleteCarComponent, {
      ...this.selectedContextMenuData,
      type: 'delete',
    });
  }

  editVehicle() {
    // Araç düzenleme işlemi
    this.drawerService.openDrawer(AddOrUpdateComponent, {
      ...this.selectedContextMenuData,
      type: 'update',
    });
  }

  onContextMenu(event: MouseEvent, busData: BusState) {
    this.selectedContextMenuData = busData;
    this.cm?.show(event);
  }

  onHide() {
    this.selectedContextMenuData = null;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
