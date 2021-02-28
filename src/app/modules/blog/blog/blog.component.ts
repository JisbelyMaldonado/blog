import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Post } from 'app/interfaces/post';
import Swal from 'sweetalert2';
import { DateService } from 'app/services/date/date.service';
import * as firebase from "firebase/app";
import { StorageService  } from 'app/services/storage/storage.service'
import { BlogService } from 'app/services/blog/blog.service';
import { take } from 'rxjs/operators';

declare var $: any;
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("tablePost") paginator: MatPaginator;
  public dataSource: MatTableDataSource<Post>;
  public displayedColumns: string[] = [
    "Nº",
    "Titulo",
    "Subtitulo",
    "Fecha",
    "Editar",
    "Eliminar",
    "Compartir"
  ];
  public imageSrc: any;
  public imageFile: any;
  public isEdit = false;
  public post: Post;
  public arrayPosts: Array<Post> = [];

  constructor( public datesService: DateService,
    public storageService: StorageService,
    public blogService: BlogService) { }

  ngOnInit(): void {
    this.post = {};
    this.getPosts();

  }

  public async getPosts() {
   await this.blogService.getPosts().subscribe((posts) => {
    this.dataSource = new MatTableDataSource<Post>(posts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   })
    
   
  }
    /**
   * *** Function para filtar en data table ***
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
    /**
   * *** Carga de imagen ***
   * @param event.
   */
  public onChangeImage(event) {
    Swal.fire({
      title: "Cargando imágen...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        Swal.showLoading();
      },
    });
    const files = event.srcElement.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    }
    this.upload(event);
  }

  public async upload(event) {
    const file = event.target.files[0];
    this.imageFile = file;
    if (this.imageFile) {
      this.post.post_img = await this.storageService.uploadFile(`posts/post${this.post.post_id}.png`, this.imageFile)
        if (this.post.post_img) {
          Swal.fire("OK", "¡Imagen cargada correctamente!", "success");
        }
    }
  //  this.uploadDocumentToStorage();
  }

  public  newPost() {
    console.log('NEW MODAL');
    
    $("#modalPost").modal("show");
    this.imageSrc = '';
    this.imageFile = '';
    this.isEdit = false;
    let id = new Date().getTime();
    this.post = {
      post_id: id.toString(),
      post_img: "",
      post_description: "",
      post_title: "",
      post_subtitle: "",
      post_category: ""
    };
  }

  /**
* *** Para mostar alertas ***
* @param icon
* @param title
*/
  showSwal(icon: any, title: string) {
    Swal.fire({
      position: "center",
      icon: icon,
      title: title,
      showConfirmButton: false,
      width: 500,
      timer: 1600,
      background: '#f6f6f6',
      backdrop: `
    transparent`,
    });

  }

    /**
   * *** Agregar nuevos Post ***
   * @param post
   * @param valid
   */
  addPost(post: Post, valid: boolean) {
    if (valid) {
      this.post.post_date = this.datesService.getDateCurrent();
      this.post.post_time = this.datesService.getTimeCurrent();
      console.log(this.post);
      if (!this.isEdit) {
        this.blogService.savePost(this.post).then(() => {
          this.showNotification('top', 'right', 'Ok! Se ha creado el post correctamente!', 'success')
           this.post = {};
           $("#modalPost").modal("hide");
         });
      } else if(this.isEdit) {
        this.blogService.updatePost(this.post).then(() => {
          this.showNotification('top', 'right', 'Ok! Post editado correctamente!', 'success')
           this.post = {};
           $("#modalPost").modal("hide");
         });
      }
   
    }
  }


  public showNotification(from, align, msg , type) {
    $.notify({
      message: "<b>" + msg + "</b> "

    }, {
      type: type,
      color: 'rgb(204, 51, 51)',
      class: 'notify',
      timer: 6000,
      placement: {
        from: from,
        align: align
      }
    });
  }

  // public  uploadDocumentToStorage() {
  //   let postLocal = this.post;
  //   var storageService = firebase.storage();
  //   var refStorage = storageService
  //     .ref("/post")
  //     .child(this.post.post_id);
  //   var uploadTask = refStorage.put(this.imageFile);
  //   uploadTask.on(
  //     "state_changed",
  //     null,
  //     function (error) {},
  //     function () {
  //       uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
  //         postLocal.post_img = downloadURL;
  //         Swal.fire("OK", "¡Imagen cargada correctamente!", "success");
  //       });
  //     }
  //   );
  // }

    /**
   * *** Seleccionar un post ***
   * @param post 
   */
  selectPost(post: Post) {
    this.isEdit = true;
    this.post = post;
  }

   /**
   * *** Funcion para eliminar Post ***
   * @param id 
   */
  public deletePost(id) {
 
    Swal.fire({
      title: '¿Confirma que desea eliminar el post?',
      showDenyButton: true,
      confirmButtonText: `Si, eliminar.`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.blogService.detelePost(id)
        Swal.fire('Post elimanado correctamente!', '', 'success')
      } 
    })
  }

  public copyLink(postId: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = 'https://inspirapmc.com/sharepost/' + postId;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.showNotification('top', 'right', 'Ok !  Link copiado correctamente!', 'success')
  }

}
