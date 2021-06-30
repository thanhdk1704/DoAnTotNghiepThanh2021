import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkenamComponent } from './thongkenam.component';

describe('ThongkenamComponent', () => {
  let component: ThongkenamComponent;
  let fixture: ComponentFixture<ThongkenamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkenamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkenamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
