import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteOrderDailogComponent } from './complete-order-dailog.component';

describe('CompleteOrderDailogComponent', () => {
  let component: CompleteOrderDailogComponent;
  let fixture: ComponentFixture<CompleteOrderDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteOrderDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteOrderDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
