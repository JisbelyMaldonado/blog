import { Component, OnInit , ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private toggleButton;
  public sidebarVisible: boolean = false;
  public itemActive: string;
  public section : any = ''
  constructor( private element: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }
    
  
    
  ngOnInit(): void {
    if (this.activatedRoute.snapshot.url[0]) {
      this.section = this.activatedRoute.snapshot.url[0].path;
    }
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
  }

    sidebarToggle() {
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }

  };

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName("body")[0];

    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    // translate3dButton
    body.classList.add("nav-open");
    body.classList.add("translate3dButton");
    this.sidebarVisible = true;
  }
  sidebarClose() {
    const body = document.getElementsByTagName("body")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    body.classList.remove("nav-open");
  }

  public openModalLogin() {
    console.log('CLICK');
    
    $("#modalLogin").modal("show");
  }

  public isItemActive(item: string , section?: string) {
    this.itemActive = item;
    if (section) {
      this.router.navigate(["/"]);
      setTimeout(() => {
        $("html, body").animate(
          {
            scrollTop: $('#'+section).position().top,
          },
          2000,
          function () { }
        );
      }, 500);
      if (this.sidebarVisible) {
        this.sidebarClose()
      }
     
    }

  }

  public viewLanding() {
    this.router.navigate(["/"]);
  }
  public viewBlog() {
    this.router.navigate(["/blog"]);
    if (this.sidebarVisible) {
      this.sidebarClose()
    }
  }

}
