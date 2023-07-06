import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtploginComponent } from './otplogin.component';

describe('OtploginComponent', () => {
  let component: OtploginComponent;
  let fixture: ComponentFixture<OtploginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtploginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtploginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
