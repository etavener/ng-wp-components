import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpPostListComponent } from './wp-post-list.component';

describe('WpListComponent', () => {
  let component: WpPostListComponent;
  let fixture: ComponentFixture<WpPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
