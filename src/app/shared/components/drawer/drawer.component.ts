import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  HostListener,
} from '@angular/core';
import { DrawerService } from '../../../services/drawer.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="drawer-overlay" *ngIf="isOpen" (click)="closeDrawer()"></div>
    <div
      class="drawer"
      [class.open]="isOpen"
      (click)="$event.stopPropagation()"
    >
      <div class="drawer-content">
        <button class="close-button" (click)="closeDrawer()">×</button>
        <ng-container #drawerContent></ng-container>
      </div>
    </div>
  `,
  styles: [
    `
      .drawer-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1000;
      }

      .drawer {
        margin-top: 4rem;
        position: fixed;
        top: 0;
        left: -600px;
        width: 600px;
        height: 100vh;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        transition: left 0.3s ease-in-out;
        z-index: 1001;
      }

      .drawer.open {
        left: 0;
      }

      .drawer-content {
        padding: 20px;
        height: 100%;
        overflow-y: auto;
      }

      .close-button[_ngcontent-ng-c3128947950] {
        position: absolute;
        top: 24px;
        right: 22px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 5px;
        z-index: 100;
      }
    `,
  ],
})
export class DrawerComponent implements OnInit {
  @ViewChild('drawerContent', { read: ViewContainerRef, static: true })
  drawerContent!: ViewContainerRef;

  isOpen = false;
  private destroy$ = new Subject<void>();

  constructor(private drawerService: DrawerService) {}

  ngOnInit() {
    this.drawerService.drawerState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.isOpen = state.isOpen;
        if (state.isOpen && state.component) {
          this.loadComponent(state.component, state.data);
        } else {
          this.drawerContent.clear();
        }
      });
  }

  private loadComponent(component: any, data?: any) {
    this.drawerContent.clear();
    const componentRef = this.drawerContent.createComponent(component);
    if (data) {
      Object.assign(componentRef.instance as object, data);
    }
  }

  closeDrawer() {
    this.drawerService.closeDrawer();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isOpen) {
      const drawerElement = document.querySelector('.drawer');
      const bottomActions = document.querySelector('.bottom-actions');
      const contextMenu = document.querySelector('.p-contextmenu');
      if (
        drawerElement &&
        !drawerElement.contains(event.target as Node) &&
        !bottomActions?.contains(event.target as Node) &&
        !contextMenu?.contains(event.target as Node)
      ) {
        this.closeDrawer();
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
