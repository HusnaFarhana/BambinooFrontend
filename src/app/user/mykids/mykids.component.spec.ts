import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MykidsComponent } from './mykids.component';

describe('MykidsComponent', () => {
  let component: MykidsComponent;
  let fixture: ComponentFixture<MykidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MykidsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MykidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
