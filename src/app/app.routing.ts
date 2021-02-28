import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout/admin-layout.component';
const routes: Routes =[
  
  {
     path: "",
     children: [
       {
         path: "",
         loadChildren: "./index/index.module#IndexModule",
       },
     ],
   },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: 'create_post',
        loadChildren: './modules/blog/blog.module#BlogModule',
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
