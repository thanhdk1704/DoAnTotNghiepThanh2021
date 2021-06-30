import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkethangComponent } from './thongkethang.component';

describe('ThongkethangComponent', () => {
  let component: ThongkethangComponent;
  let fixture: ComponentFixture<ThongkethangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkethangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkethangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
