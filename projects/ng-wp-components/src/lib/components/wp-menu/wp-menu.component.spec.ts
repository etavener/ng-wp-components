import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpMenuComponent } from './wp-menu.component';

describe('WpMenuComponent', () => {
  let component: WpMenuComponent;
  let fixture: ComponentFixture<WpMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
