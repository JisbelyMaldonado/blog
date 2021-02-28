import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent  } from 'app/index/index/index.component';
import { BlogComponent  } from 'app/index/blog/blog/blog.component';
import { DetailPostComponent } from './detail-post/detail-post.component';

export const IndexRoutingModule: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: IndexComponent,
      },
      {
        path: "landing/:section",
        component: IndexComponent,
      },
      {
        path: "blog",
        component: BlogComponent,
      },
       {
        path: "detail/:post_id",
        component: DetailPostComponent,
      },
    ] 
  },
]