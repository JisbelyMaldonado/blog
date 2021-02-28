import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }

  updateTitle(title: string){
    console.log(title);
    
    this.title.setTitle(title);
  }
  updateMetaTags(metaTags: MetaDefinition[]){
    console.log(metaTags);
    
    metaTags.forEach(m=> this.meta.updateTag(m));
  }
}
