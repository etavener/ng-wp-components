import { Component, ContentChild, Input, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { WordpressService } from '../../wordpress.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'wp-menu',
  templateUrl: './wp-menu.component.html'
})
export class WpMenuComponent implements OnChanges {

  @Input() homeSlug = 'home';
  @Input() menuId: string;
  @ContentChild(TemplateRef, { static: false } ) template: TemplateRef<any>;
  menu$: Observable<any>;

  constructor(
    private wordpressService: WordpressService
  ) { }

  ngOnChanges(): void {
    this.menu$ = this.wordpressService.getMenuById( this.menuId, this.homeSlug );
  }

}
