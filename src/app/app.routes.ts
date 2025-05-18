import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { HeaderComponent } from './header/header.component';



export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'results', component: ResultsComponent },
];
