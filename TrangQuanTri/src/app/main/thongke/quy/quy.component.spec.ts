import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuyComponent } from './quy.component';

describe('QuyComponent', () => {
  let component: QuyComponent;
  let fixture: ComponentFixture<QuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
