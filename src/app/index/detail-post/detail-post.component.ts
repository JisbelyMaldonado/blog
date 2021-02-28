import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Post } from 'app/interfaces/post';
import { BlogService } from 'app/services/blog/blog.service';
import { Title, Meta } from '@angular/platform-browser';
import * as archivo from  '../../../assets/js/facebook.js'
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {
  public post_id = this.activatedRoute.snapshot.params.post_id;
  public post: Post;
  constructor(private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    public meta: Meta,
    public seoService: SeoService,
    private  title: Title,) { 
        if (this.post_id) {
         this.blogService.getPostId(this.post_id).subscribe(post => {
           this.post = post;
             archivo.initFacebook()
          })
       }
    }
  

  ngOnInit(): void {
    window.scrollTo(0, 0); 
   // this.getPostId()
  
  }
  
  public getPostId() {
    this.blogService.getPostId(this.post_id).subscribe(post => {
      this.post = post;
      // this.updateMetas()
    })
  }

  // public updateMetas() {
  //   this.meta.updateTag({ property: 'og:title', content: this.post.post_title });
  //   this.title.setTitle(this.post.post_title )
  //   this.meta.updateTag({ property: 'og:url', content: 'https://inspirapmc.com/#/detail/'+ this.post.post_id });
  //   this.meta.updateTag({ property: 'og:image', content: this.post.post_img });
  //   this.meta.updateTag({ property: 'og:description', content: this.post.post_title });
  // }
  public sharePost1() {
    archivo.sharePost(this.post.post_id)

  }
}
