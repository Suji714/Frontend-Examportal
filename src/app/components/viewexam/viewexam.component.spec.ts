import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewexamComponent } from './viewexam.component';

describe('ViewexamComponent', () => {
  let component: ViewexamComponent;
  let fixture: ComponentFixture<ViewexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewexamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
