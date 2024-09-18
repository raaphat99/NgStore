import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfleComponent } from './edit-profle.component';

describe('EditProfleComponent', () => {
  let component: EditProfleComponent;
  let fixture: ComponentFixture<EditProfleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
