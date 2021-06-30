import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemkhoComponent } from './kiemkho.component';

describe('KiemkhoComponent', () => {
  let component: KiemkhoComponent;
  let fixture: ComponentFixture<KiemkhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemkhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
