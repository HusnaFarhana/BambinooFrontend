import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglekidComponent } from './singlekid.component';

describe('SinglekidComponent', () => {
  let component: SinglekidComponent;
  let fixture: ComponentFixture<SinglekidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglekidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglekidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
