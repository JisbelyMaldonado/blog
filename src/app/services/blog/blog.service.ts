import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Post } from 'app/interfaces/post';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private last: any;
  private next: any;
  private nextToTalPost: any;
  constructor(private db: AngularFirestore) { }

  public savePost(post: Post) {
    return this.db.collection('posts').doc(`${post.post_id}`).set(post)
  }

  public updatePost(post: Post) {
    return this.db.collection('posts').doc(`${post.post_id}`).update(post)
  }

  public getPosts() {
    return this.db.collection('posts', ref => ref.orderBy('post_id', 'desc')).valueChanges()
  }
  public detelePost(post_id: string) {
    return this.db.collection('posts').doc(`${post_id}`).delete()
  }

  public   getPostByCategory(category_name: string) {
    let  first =  this.db.collection<Post>('posts', (ref) => ref.where("post_category", "==", category_name)
    .orderBy("post_id", "desc")
    .limit(3)
    );
    first.get().subscribe(documentSnapshots =>{
      // Get the last visible document
      if (documentSnapshots.docs.length > 0) {
        var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
        // Construct a new query starting at this document,
        // get the next 25 cities.
        this.next = this.db.collection("posts", ref => ref
                .where("post_category", "==", category_name)
                .orderBy("post_id", "desc")
                .startAfter(lastVisible)
                .limit(3));
      }
     
    });
    return first.valueChanges()  
   
  }

  public getAllPostInBlog() {
    let  first =  this.db.collection<Post>('posts', (ref) => ref.orderBy("post_id", "desc")
    .limit(3)
    );
    first.get().subscribe(documentSnapshots =>{
      if (documentSnapshots.docs.length > 0) {
        var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
        this.nextToTalPost = this.db.collection("posts", ref => ref
                .orderBy("post_id", "desc")
                .startAfter(lastVisible)
                .limit(3));
      }
     
    });
    return first.valueChanges()  
  }

  public   getMoreTotalPostInBlog() {
    this.nextToTalPost.get().subscribe(documentSnapshots =>{
     if (documentSnapshots.docs.length > 0) {
       var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
       this.nextToTalPost = this.db.collection("posts", ref => ref
       .orderBy("post_id", "desc")
       .startAfter(lastVisible)
       .limit(3));
     }
   
   });
   return this.nextToTalPost.valueChanges()
 }

  public   getTotalPostByCategory(category_name: string) {
    return this.db.collection<Post>('posts', (ref) => ref.where("post_category", "==", category_name)
    .orderBy("post_id", "desc")
    ).valueChanges();
   
  }

  public   getMoreTree(category_name: string) {
     this.next.get().subscribe(documentSnapshots =>{
      if (documentSnapshots.docs.length > 0) {
        var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
        this.next = this.db.collection("posts", ref => ref
        .where("post_category", "==", category_name)
        .orderBy("post_id", "desc")
        .startAfter(lastVisible)
        .limit(3));
      }
    
    });
    return this.next.valueChanges()
  }
  public getPostId(post_id: string) {
    return this.db.collection('posts').doc(`${post_id}`).valueChanges()
  }
}
