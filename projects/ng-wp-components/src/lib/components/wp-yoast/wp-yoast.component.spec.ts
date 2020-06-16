import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpYoastComponent } from './wp-yoast.component';

describe('WpYoastComponent', () => {
  let component: WpYoastComponent;
  let fixture: ComponentFixture<WpYoastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpYoastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpYoastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
