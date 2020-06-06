import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WordpressURL } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  constructor(
    @Inject( WordpressURL ) private wordpressURL: string,
    private http: HttpClient
  ) { }

  getWordpress( path: string = '' ) {
    return this.http.get( `${this.wordpressURL}/wp-json${path}` );
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

  getPosts(
    category: string,
    limit: number = 100,
    orderby: string = 'date',
    order: 'asc' | 'desc' = 'desc',
    page: number = 1
  ) {
    return this.getWordpress(
      `/wp/v2/posts?categories=${category}&per_page=${limit}&orderby=${orderby}&order=${order}&page=${page}`
    );
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
          if ( item.url.startsWith(this.wordpressURL) ) {
            item.url = item.url.replace( this.wordpressURL, '' );
          }
          if ( item.url.includes( homeSlug ) ){
            item.url = '/';
          }
          return item;
        }) )
      );
  }

}
