import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
  WpInfoComponent,
  WpPageComponent,
  WpImageComponent,
  WpPostListComponent,
  WpPostComponent,
  WpMenuComponent
} from './components';
import { WordpressService } from './wordpress.service';
import { WordpressURL } from './config.service';
import { WpYoastComponent } from './components/wp-yoast/wp-yoast.component';
import { WpPaginatorComponent } from './components/wp-paginator/wp-paginator.component';


const components = [
  WpInfoComponent,
  WpPageComponent,
  WpImageComponent,
  WpPostListComponent,
  WpPostComponent,
  WpMenuComponent
];

@NgModule({
  declarations: [
    ...components,
    WpYoastComponent,
    WpPaginatorComponent
  ],
  exports: [
    ...components
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule
  ]
})
export class NgWpComponentsModule {
  static forRoot( wordpressURL: string ): ModuleWithProviders {
    return {
      ngModule: NgWpComponentsModule,
      providers: [
        WordpressService,
        {
          provide: WordpressURL,
          useValue: wordpressURL
        }
      ]
    };
  }
}
