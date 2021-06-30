import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuoiNgayComponent } from './cuoi-ngay.component';

describe('CuoiNgayComponent', () => {
  let component: CuoiNgayComponent;
  let fixture: ComponentFixture<CuoiNgayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuoiNgayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuoiNgayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
