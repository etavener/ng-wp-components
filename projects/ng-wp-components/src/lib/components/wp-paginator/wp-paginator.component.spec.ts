import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpPaginatorComponent } from './wp-paginator.component';

describe('WpPaginatorComponent', () => {
  let component: WpPaginatorComponent;
  let fixture: ComponentFixture<WpPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
