import { Component, ContentChild, Input, OnChanges, TemplateRef } from '@angular/core';
import { WordpressService } from '../../wordpress.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'wp-post-list',
  templateUrl: './wp-post-list.component.html'
})
export class WpPostListComponent implements OnChanges {

  @Input() page = 1;
  @Input() order: 'asc' | 'desc' = 'desc';
  @Input() orderBy = 'date';
  @Input() limit = 100;
  @Input() category: string;
  @ContentChild(TemplateRef, { static: false } ) template: TemplateRef<any>;
  posts$: Observable<any>;

  constructor(
    private wordpressService: WordpressService
  ) { }

  ngOnChanges(): void {
    this.posts$ = this.wordpressService.getPosts( this.category, this.limit, this.orderBy, this.order, this.page );
  }

}
