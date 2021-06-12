import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DetailsPanelComponent } from './details-panel/details-panel.component';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    DetailsPanelComponent,
    NavigationPanelComponent,
    NotFoundComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  exports:[
    DetailsPanelComponent,
    NavigationPanelComponent,
    NotFoundComponent,
    FilterPipe
  ]
})
export class SharedModule { }
