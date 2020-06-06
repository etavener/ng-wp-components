import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WordpressURL } from './config.service';

const WORDPRESS = `https://wp.learnario.com`;

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  constructor(
    @Inject( WordpressURL ) private wordpress,
    private http: HttpClient
  ) { }

  getWordpress( path: string = '' ) {
    return this.http.get( `${WORDPRESS}/wp-json${path}` );
  }

  getWordpressInfo() {
    return this.getWordpress();
  }

  getPageBySlug( slug: string ) {
    return this.getWordpress(`/wp/v2/pages?slug=${slug}`)
      .pipe(
        map( response => response[ 0 ] )
      );
  }

  getMediaById( id: string ) {
    return this.getWordpress( `/wp/v2/media/${id}`);
  }

  getPosts( category: string, limit: number = 100 ) {
    return this.getWordpress(`/wp/v2/posts?categories=${category}&per_page=${limit}` );
  }

  getPostBySlug( slug: string ) {
    return this.getWordpress(`/wp/v2/posts?slug=${slug}`)
      .pipe(
        map( response => response[ 0 ] )
      );
  }

  getMenuById( id: string, homeSlug: string ){
    return this.getWordpress(`/menus/v1/menus/${id}` )
      .pipe(
        map( (response: any) => response.items.map( item => {
          if ( item.url.startsWith(WORDPRESS) ) {
            item.url = item.url.replace( WORDPRESS, '' );
          }
          if ( item.url.includes( homeSlug ) ){
            item.url = '/';
          }
          return item;
        }) )
      );
  }

}
