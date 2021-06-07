import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DetailsPanelComponent } from './details-panel/details-panel.component';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DetailsPanelComponent,
    NavigationPanelComponent    
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports:[
    DetailsPanelComponent,
    NavigationPanelComponent
  ]
})
export class SharedModule { }
