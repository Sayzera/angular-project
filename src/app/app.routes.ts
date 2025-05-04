import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AnasayfaComponent } from './features/anasayfa/anasayfa.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'anasayfa', pathMatch: 'full' },
      { path: 'anasayfa', component: AnasayfaComponent },
      { path: 'hakkinda', component: AnasayfaComponent },
      { path: 'iletisim', component: AnasayfaComponent },
      { path: 'location', component: AnasayfaComponent }, 
      { path: 'polarcell', component: AnasayfaComponent },
      { path: 'vehicle-management', component: AnasayfaComponent },
    ]
  }
];
