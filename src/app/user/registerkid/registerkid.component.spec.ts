import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterkidComponent } from './registerkid.component';

describe('RegisterkidComponent', () => {
  let component: RegisterkidComponent;
  let fixture: ComponentFixture<RegisterkidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterkidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterkidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
