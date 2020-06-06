# NgWordpressComponents

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9.

This is a set of simple wordpress components that provide access to wordpress data without markup.

These were originally developed to be used in Scully.io for static use.

These components (except wp-image) don't insert html markup and use templates. This way you can use whatever markup you want.

There is also a wordpress service that you can use to call API's directly.


## Installing the wordpress components

`npm install ng-wp-components --save`

Import module to your angular module (you need to specify your wordpress url):
```typescript
import { NgWpComponentsModule } from 'ng-wp-components';

@NgModule({
  ...
  imports: [
    ...
    NgWpComponentsModule.forRoot( 'https://wp.learnario.com' ),
  ]
})
export class Module { }
```

## Display Wordpress Info (site name and description)
```html
<wp-info>
  <ng-template let-info="info">
    {{ info.name }}: {{ info.description }}
  </ng-template>
</wp-info>
```


## Display Wordpress Page by Slug
```html
<wp-page slug="home">
  <ng-template let-page="page">
    <h1>
      {{ page.title.rendered }}
    </h1>
    <p [innerHTML]="page.content.rendered"></p>
  </ng-template>
</wp-page>
```

## Display Wordpress Post by Slug (with image)

This example uses both `wp-post` and `wp-image`:
```html
  <wp-post [slug]="slug">
    <ng-template let-post="post">
      <h1>
        {{ post.title.rendered }}
      </h1>
      <p [innerHTML]="post.content.rendered"></p>
      <wp-image size="medium" [mediaId]="post.featured_media"></wp-image>
    </ng-template>
  </wp-post>
```

## Display Wordpress Image by id

Can be used inside a page or post to display the image.
```html
<wp-image size="medium" [mediaId]="post.featured_media"></wp-image>
```

## Display List of Wordpress Posts by category id

For every post it will create a section with content:
```html
<wp-post-list category="2">
  <ng-template let-post="post">
    <section [id]="post.slug">
      <h2>{{ post.title.rendered }}</h2>
      <div [innerHTML]="post.excerpt.rendered"></div>
    </section>
  </ng-template>
</wp-post-list>
```

For every post it will create a link with title linking to the slug:
```html
<wp-post-list class="list-group" category="2">
  <ng-template let-post="post">
    <a routerLink="."
       [fragment]="post.slug">
      {{ post.title.rendered }}
    </a>
  </ng-template>
</wp-post-list>
```



## A Wordpress Menu by id

**IMPORTANT**: This component requires Wordpress Plugin installed called 'WP-REST-API V2 Menus'. This will provide an API to get the menu items.

Each menu item is automatically converted to a relative link. 

The wordpress URL is removed from all links for that they become relative.
```html
<wp-menu menuId="6">
  <ng-template let-menuItem="menuItem">
    <a routerLinkActive="active"
       [routerLinkActiveOptions]="{ exact:true }"
       [routerLink]="menuItem.url">
      {{ menuItem.title }}
    </a>
  </ng-template>
</wp-menu>
```
because you can not have a slug in wordpress that is '' you need to set the slug of your home page to something.

The menu will automatically change these home page links to be '/'.

By default the menu will assume your home page slug is 'home'. However, you can change this by doing:
```html
<wp-menu menuId="6" homeSlug="home-page">
  <ng-template let-menuItem="menuItem">
    <a routerLinkActive="active"
       [routerLinkActiveOptions]="{ exact:true }"
       [routerLink]="menuItem.url">
      {{ menuItem.title }}
    </a>
  </ng-template>
</wp-menu>
```


## A More complex example

More complex example with nested components:

The example below combines components to:
 - a post by slug (from the params)
 - an image attached to the post
 - a page by slug ("about")
 
post.component.ts:
```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  slug$: Observable<string>;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.slug$ = this.route.paramMap.pipe(
      map( params => params.get('post-slug') )
    );
  }

}
```

 post.component.html:
```html
<div class="container">
  <wp-post [slug]="slug$ | async" class="row">
    <ng-template let-post="post">
      <div class="col-8">
        <wp-page slug="about">
          <ng-template let-page="page">
            <h1 class="display-1">
              {{ post.title.rendered }}
            </h1>
            <p class="mb-4" [innerHTML]="post.content.rendered"></p>
          </ng-template>
        </wp-page>
      </div>
      <div class="col-4">
        <wp-image size="medium" [mediaId]="post.featured_media"></wp-image>
      </div>
    </ng-template>
  </wp-post>
</div>
```
