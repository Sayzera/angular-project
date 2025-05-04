import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DrawerState {
  isOpen: boolean;
  component: any;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  protected drawerState = new BehaviorSubject<DrawerState>({
    isOpen: false,
    component: null,
    data: null
  });

  drawerState$ = this.drawerState.asObservable();

  openDrawer(component: any, data?: any) {
    this.drawerState.next({
      isOpen: true,
      component,
      data
    });
  }

  closeDrawer() {
    this.drawerState.next({
      isOpen: false,
      component: null,
      data: null
    });
  }
} 