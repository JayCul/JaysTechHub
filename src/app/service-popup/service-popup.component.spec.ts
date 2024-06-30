import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePopupComponent } from './service-popup.component';

describe('ServicePopupComponent', () => {
  let component: ServicePopupComponent;
  let fixture: ComponentFixture<ServicePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicePopupComponent]
    });
    fixture = TestBed.createComponent(ServicePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
