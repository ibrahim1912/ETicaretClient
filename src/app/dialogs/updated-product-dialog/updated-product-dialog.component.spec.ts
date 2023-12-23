import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedProductDialogComponent } from './updated-product-dialog.component';

describe('UpdatedProductDialogComponent', () => {
  let component: UpdatedProductDialogComponent;
  let fixture: ComponentFixture<UpdatedProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedProductDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatedProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
