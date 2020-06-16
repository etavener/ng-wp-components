# NgWordpressComponents

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
    NgWpComponentsModule.forRoot( 'https://my-wordpress-site.com' ),
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

Displays a `medium` image with an id of `10`. Size is the wordpress sizes.
```html
<wp-image size="medium" mediaId="10">
  <ng-template let-image="image" let-media="media">
    <img [src]="image.source_url" [alt]="media.alt_text" />
  </ng-template>
</wp-image>
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

## Display List of Wordpress Posts 

### All
```html
<wp-post-list>
  <ng-template let-post="post">
    <section [id]="post.slug">
      <h2>{{ post.title.rendered }}</h2>
      <div [innerHTML]="post.excerpt.rendered"></div>
    </section>
  </ng-template>
</wp-post-list>
```

### filtered by category id
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
<wp-post-list category="2">
  <ng-template let-post="post">
    <a routerLink="."
       [fragment]="post.slug">
      {{ post.title.rendered }}
    </a>
  </ng-template>
</wp-post-list>
```

### ordered
You can also order your list (by default they are ordered by date desc)
```html
<wp-post-list orderBy="date" order="desc" category="2">
  <ng-template let-post="post">
    <a routerLink="."
       [fragment]="post.slug">
      {{ post.title.rendered }}
    </a>
  </ng-template>
</wp-post-list>
```
### limited
You can limit your list (by default they are limited to 100 which is the max allowed by Wordpress)
```html
<wp-post-list limit="10" category="2">
  <ng-template let-post="post">
    <a routerLink="."
       [fragment]="post.slug">
      {{ post.title.rendered }}
    </a>
  </ng-template>
</wp-post-list>
```
### paged
You can get a specific page (default is 1).
In this example posts 11 to 20 will be displayed.
```html
<wp-post-list limit="10" page="2" category="2">
  <ng-template let-post="post">
    <a routerLink="."
       [fragment]="post.slug">
      {{ post.title.rendered }}
    </a>
  </ng-template>
</wp-post-list>
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
  <wp-post [slug]="slug$ | async">
    <ng-template let-post="post">
      <h1>
        {{ post.title.rendered }}
      </h1>
      <p [innerHTML]="post.content.rendered"></p>
      <wp-post slug="about">
        <ng-template let-about="post">
          <h2>
            {{ about.title.rendered }}
          </h2>
          <p [innerHTML]="about.content.rendered"></p>
        </ng-template>
      </wp-post>
      <wp-image size="medium" [mediaId]="post.featured_media">
        <ng-template let-image="image" let-media="media">
          <img [src]="image.source_url" [alt]="media.alt_text" />
        </ng-template>
      </wp-image>
    </ng-template>
  </wp-post>
```


## Pagination
```html
<wp-paginator category="1" type="posts" itemsPerPage="20">
    <ng-template let-items="items" let-pages="pages">
        <a *ngFor="let page of pages" 
           [routerLink]="[ 'item', page ]">
        {{ page }}
        </a>
    </ng-template>
</wp-paginator>
```

## SEO

Apply Yoast seo data to your page with slug 'home':
```html
<wp-yoast slug="home" type="page"></wp-yoast>
```

Apply Yoast seo data to your post with slug 'home':
```html
<wp-yoast slug="home" type="page"></wp-yoast>
```
