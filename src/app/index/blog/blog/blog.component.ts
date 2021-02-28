import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'app/interfaces/post';
import { BlogService } from 'app/services/blog/blog.service';
import { take } from 'rxjs/operators';
import * as archivo from  '../../../../assets/js/facebook.js'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public arrayPosts: Array<Post> = [];
  public optionActive:string = '';
  public isMobile = false;
  public limit: number;
  public totalPostByCategorylength : number ;
  public count: number;
  public hiddenButton : boolean;
  constructor(private blogService: BlogService, private router : Router) { 
    archivo.initFacebook()
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    const width = $(window).width()
    if (width <= 767) {

      this.isMobile = true;
    } else  if (width > 767) {

      this.isMobile = false;
    }
    this.getTotalPostInBlog();

  }

  public getTotalPostInBlog() {
    this.hiddenButton = false;
    this.blogService.getAllPostInBlog().subscribe(posts => {
      if (posts.length < 3) {
        this.hiddenButton = true;
      }
      this.arrayPosts = posts
    })
  }
  public getTotalPost(category_name: string) {
    this.blogService.getTotalPostByCategory(category_name).subscribe(posts => {
      
      this.totalPostByCategorylength = posts.length
    })
  }

  public async getPostsByCategory(category_name: string) {
    this.optionActive = category_name;
    this.hiddenButton = false;
    this.getTotalPost( this.optionActive)
    this.blogService.getPostByCategory(category_name).subscribe(posts => {
      if (posts.length < 3) {
        this.hiddenButton = true;
      }
      this.arrayPosts = posts
    })
   
    

  }

  // @HostListener('window:scroll', ['$event']) 
  // scrollHandler(event) {
  //   if ($(window).scrollTop() == $(document).height()  - ($(window).height())){
  //         this.getMoreTree()
  //    }
  //   }
  

  public getMoreTree() {
    if (this.optionActive !== '') {
      this.blogService.getMoreTree(this.optionActive).pipe(take(1)).subscribe(posts => {
        if (posts.length < 3) {
          this.hiddenButton = true;
        }
        posts.forEach(element => {
          if (!this.arrayPosts.includes(element)) {
            this.arrayPosts.push(element);
          }
        });
      })
    } else if (this.optionActive === '') {
      this.blogService.getMoreTotalPostInBlog().pipe(take(1)).subscribe(posts => {
        console.log('MORE POSTSSS',posts);
        if (posts.length < 3) {
          this.hiddenButton = true;
        }
        posts.forEach(element => {
          if (!this.arrayPosts.includes(element)) {
            this.arrayPosts.push(element);
          }
        });
      })
    }

  }

  onResize(event) {
    const innerWidth = event.target.innerWidth;
    if (innerWidth < 767) {
      this.isMobile = true;
    } else  if (innerWidth >= 767) {
      this.isMobile = false;
    }
  }
  public viewMore(post_id: string) {
    console.log(post_id);
    
    this.router.navigate(["/detail/" + post_id ])
    window.scrollTo(0, 0);
  }

  public sharePost1(post_id: string) {
    archivo.sharePost(post_id)

  }
}
