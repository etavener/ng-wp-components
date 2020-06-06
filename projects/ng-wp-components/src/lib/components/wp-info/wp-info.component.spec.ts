import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpInfoComponent } from './wp-info.component';

describe('WpNameComponent', () => {
  let component: WpInfoComponent;
  let fixture: ComponentFixture<WpInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
