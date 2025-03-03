import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { GridComponentComponent } from './components/test_01/grid-component.component';
import { TestOriginComponent } from './components/test_origin/test_origin.component';
import { Test03Component } from './components/test_03/test_03.component';

const routes: Routes = [
  {
    component: TestComponent,
    path: 'test',
    title: 'test-component', 
  },
  {
    component: GridComponentComponent,
    path: 'grid',
    title: 'grid-component'
  },
  {
    component: TestOriginComponent,
    path: 'origin',
    title: 'Test-origin'
  },
  {
    component: Test03Component,
    path: 'test03',
    title: 'test-03'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }