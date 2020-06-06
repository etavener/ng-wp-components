import { Component, ContentChild, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { WordpressService } from '../../wordpress.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'wp-info',
  templateUrl: './wp-info.component.html'
})
export class WpInfoComponent implements OnInit {

  info$: Observable<any>;
  @ContentChild(TemplateRef, { static: false } ) template: TemplateRef<any>;

  constructor(
    private wordpressService: WordpressService
  ) { }

  ngOnInit(): void {
    this.info$ = this.wordpressService.getWordpressInfo();
  }

}
