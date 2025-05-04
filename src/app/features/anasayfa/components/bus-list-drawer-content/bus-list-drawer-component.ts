import { Component } from "@angular/core";
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { CarSettingsComponent } from "./car-settings-content/car-settings.component";

@Component({
    selector: 'bus-list-drawer',
    standalone: true,
    templateUrl: './bus-list-drawer.component.html',
    imports: [CommonModule, TabsModule, CarSettingsComponent],
    styleUrls: ['./bus-list.component.css']
})


export class BusListDrawerComponent {}
