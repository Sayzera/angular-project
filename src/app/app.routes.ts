import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AnasayfaComponent } from './features/anasayfa/anasayfa.component';
import { HakkindaComponent } from './features/hakkinda/hakkinda.component';
import { IletisimComponent } from './features/iletisim/iletisim.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'anasayfa', component: AnasayfaComponent },
      { path: 'hakkinda', component: HakkindaComponent },
      { path: 'iletisim', component: IletisimComponent },
      { path: '', redirectTo: 'anasayfa', pathMatch: 'full' }
    ]
  }
];
