import { Component, ContentChild, Input, OnChanges, TemplateRef } from '@angular/core';
import { WordpressService } from '../../wordpress.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'wp-image',
  templateUrl: './wp-image.component.html'
})
export class WpImageComponent implements OnChanges {

  @Input() size = 'medium';
  @Input() mediaId: string;

  @ContentChild(TemplateRef, { static: false } ) template: TemplateRef<any>;
  media$: Observable<any>;

  constructor(
    private wordpressService: WordpressService
  ) { }

  ngOnChanges(): void {
    this.media$ = this.wordpressService.getMediaById( this.mediaId );
  }

}
