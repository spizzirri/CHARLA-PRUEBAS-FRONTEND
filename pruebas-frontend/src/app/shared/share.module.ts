import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPanelComponent } from './details-panel/details-panel.component';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';

@NgModule({
  declarations: [
    DetailsPanelComponent,
    NavigationPanelComponent    
  ],
  imports: [
    CommonModule
  ],
  exports:[
    DetailsPanelComponent,
    NavigationPanelComponent
  ]
})
export class SharedModule { }
