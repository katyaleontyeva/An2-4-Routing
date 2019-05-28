import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';

import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { TasksModule } from './tasks/tasks.module';
import { CoreModule } from './core/core.module';
// import { UsersModule } from './users/users.module'; // Lazy
// import { AdminModule } from './admin/admin.module'; // Lazy
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LayoutModule,
    CoreModule,
    SharedModule,
    TasksModule,
    HttpClientModule,
    // MUST BE LAST
    AppRoutingModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
