import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { DataInterceptor } from './components/test/data.interceptor';
import { DataService } from './components/test/data.service';
import { GridComponentComponent } from './components/test_01/grid-component.component'
import { TestOriginComponent } from './components/test_origin/test_origin.component';
@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    GridComponentComponent,
    TestOriginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    WjGridModule
  ],
  providers: [
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DataInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
