import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpImageComponent } from './wp-image.component';

describe('WpImageComponent', () => {
  let component: WpImageComponent;
  let fixture: ComponentFixture<WpImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
