import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AboutComponent, PathNotFoundComponent, MessagesComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    AboutComponent,
    PathNotFoundComponent,
    MessagesComponent
  ]
})
export class LayoutModule { }
