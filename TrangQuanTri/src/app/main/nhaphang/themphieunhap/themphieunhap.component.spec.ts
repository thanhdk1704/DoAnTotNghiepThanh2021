import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemphieunhapComponent } from './themphieunhap.component';

describe('ThemphieunhapComponent', () => {
  let component: ThemphieunhapComponent;
  let fixture: ComponentFixture<ThemphieunhapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemphieunhapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemphieunhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
