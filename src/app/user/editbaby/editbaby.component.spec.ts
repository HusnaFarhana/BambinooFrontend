import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbabyComponent } from './editbaby.component';

describe('EditbabyComponent', () => {
  let component: EditbabyComponent;
  let fixture: ComponentFixture<EditbabyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditbabyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditbabyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
