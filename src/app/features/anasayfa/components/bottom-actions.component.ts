import { Component } from '@angular/core';
import { DrawerService } from '../../../services/drawer.service';
import { BusListDrawerComponent } from './bus-list-drawer-content/bus-list-drawer-component';
import { DrawerComponent } from '../../../shared/components/drawer/drawer.component';

@Component({
  selector: 'app-bottom-actions',
  standalone: true,
  templateUrl: './bottom-actions.component.html',
  imports: [DrawerComponent, DrawerComponent],
})
export class BottomActionsComponent {
  constructor(private drawerService: DrawerService) {}
  openDrawer(type: string) {
    const data = {
      title: type === 'example1' ? 'Örnek 1 Başlık' : 'Örnek 2 Başlık',
      content:
        type === 'example1'
          ? 'Örnek 1 içeriği burada'
          : 'Örnek 2 içeriği burada',
    };

    switch (type) {
      case 'bus-list':
        this.drawerService.openDrawer(BusListDrawerComponent, data);
        break;
  
      default:
        break;
    }
  }
}
