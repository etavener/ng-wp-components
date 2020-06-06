import { Component, ContentChild, Input, OnChanges, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { WordpressService } from '../../wordpress.service';

@Component({
  selector: 'wp-page',
  templateUrl: './wp-page.component.html'
})
export class WpPageComponent implements OnChanges {

  @Input() slug: string;
  @ContentChild(TemplateRef, { static: false } ) template: TemplateRef<any>;
  page$: Observable<any>;

  constructor(
    private wordpressService: WordpressService
  ) { }

  ngOnChanges(): void {
    this.page$ = this.wordpressService.getPageBySlug( this.slug );
  }

}
