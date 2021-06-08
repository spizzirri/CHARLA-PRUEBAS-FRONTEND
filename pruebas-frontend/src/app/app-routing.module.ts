import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersListComponent } from './players-list/players-list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: ':region',
    component: PlayersListComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
