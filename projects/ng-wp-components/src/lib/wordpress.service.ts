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

  getWordpress( path: string = '', options: any = { observe: 'body' } ) {
    return this.http.get( `${this.wordpressURL}/wp-json${path}`, options );
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

  getPagination(
    category: string,
    type: 'pages' | 'posts',
    limit = 100,
  ) {
    return this.getWordpress(
      `/wp/v2/${type}?categories=${category}&per_page=${limit}`,
      { observe: 'response' }
    ).pipe(
      map( (response: any) => {
        if ( response.headers ) {
          const totalPages = response.headers.get( 'X-WP-TotalPages' );
          const total = response.headers.get( 'X-WP-Total' );
          const pages = [];
          for ( let p = 0; p < totalPages; p++ ) {
            pages.push( p );
          }
          return {
            items: total,
            pages,
          };
        }
        return null;
      })
    );
  }

  getYoastBySlug( slug: string, type: 'page' | 'post' ) {
    return this.getWordpress(`/wp/v2/${type}s?slug=${slug}`).pipe(
      map( response => response[ 0 ] )
    );
  }

}
