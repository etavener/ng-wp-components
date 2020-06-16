import { Component, Input, OnChanges } from '@angular/core';
import { WordpressService } from '../../wordpress.service';
import { Observable } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'wp-yoast',
  templateUrl: './wp-yoast.component.html',
  styleUrls: ['./wp-yoast.component.css']
})
export class WpYoastComponent implements OnChanges {

  @Input() slug: string;
  @Input() type: 'post' | 'page' = 'page';
  @Input() debug: boolean;
  @Input() fields: string[] = [
    'meta[name=description]',
    'meta[name="twitter:card"]',
    'meta[property="og:locale"]',
    'meta[property="og:type"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:site_name"]',
    'meta[property="article:modified_time"]'
  ];

  seo$: Observable<any>;

  constructor(
    private wordpress: WordpressService,
    private meta: Meta,
    private title: Title
  ) { }

  ngOnChanges(): void {
    this.seo$ = this.wordpress.getYoastBySlug( this.slug, this.type ).pipe(
      tap( data => {
        if ( data && data.yoast_head ) {
          this.addMetaData( data );
        } else {
          console.error( `META: No Yoast Information for ${this.type} with slug "${this.slug}"` );
        }
      })
    );
  }

  addMetaData( data: string ) {
    const domParser = new DOMParser();
    const parsedHtml = domParser.parseFromString( data, 'text/html' );

    const title: any = parsedHtml.querySelector('title');

    if ( title ) {
      this.title.setTitle( title.innerHTML );
    } else {
      console.error( `META: No title element for ${ this.type } with slug "${ this.slug }"` );
    }

    this.fields.forEach( selector => {
      const metaElement = parsedHtml.querySelector( selector );

      if ( metaElement ) {
        const content = metaElement.getAttribute('content');
        const name = metaElement.getAttribute('name');
        const property = metaElement.getAttribute('property');

        const metaToAdd: any = { content };
        if ( property ) {
          metaToAdd.property = property;
        }
        if ( name ) {
          metaToAdd.name = name;
        }

        this.meta.updateTag( metaToAdd );
      }
    });
  }


}
