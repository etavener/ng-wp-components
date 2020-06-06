import { Component, ContentChild, Input, OnChanges, TemplateRef } from '@angular/core';
import { WordpressService } from '../../wordpress.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'wp-post',
  templateUrl: './wp-post.component.html'
})
export class WpPostComponent implements OnChanges {

  post$: Observable<any>;

  @Input() slug: string;
  @ContentChild(TemplateRef, { static: false } ) template: TemplateRef<any>;

  constructor(
    private wordpressService: WordpressService
  ) { }

  ngOnChanges(): void {
    this.post$ = this.wordpressService.getPostBySlug( this.slug );
  }

}
