import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent  } from 'app/index/index/index.component';
import { BlogComponent  } from 'app/index/blog/blog/blog.component';
import { IndexRoutingModule } from './index-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterLandingPageComponent } from './footer-landing-page/footer-landing-page.component';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { IsLoginComponent } from './is-login/is-login.component';

@NgModule({
  declarations: [IndexComponent, BlogComponent, NavbarComponent, FooterLandingPageComponent, DetailPostComponent, IsLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(IndexRoutingModule),
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class IndexModule { }
