import { Component, ContentChild, Input, OnChanges, TemplateRef } from '@angular/core';
import { WordpressService } from '../../wordpress.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'wp-paginator',
  templateUrl: './wp-paginator.component.html',
  styleUrls: ['./wp-paginator.component.css']
})
export class WpPaginatorComponent implements OnChanges {

  @Input() itemsPerPage = 100;
  @Input() category: string;
  @Input() type: 'posts' | 'pages' = 'posts';
  @ContentChild(TemplateRef, { static: false } ) template: TemplateRef<any>;

  $pagination: Observable<any>;

  constructor(
    private wordpress: WordpressService
  ) { }

  ngOnChanges(): void {
    this.$pagination = this.wordpress.getPagination( this.category, this.type, this.itemsPerPage );
  }

}
