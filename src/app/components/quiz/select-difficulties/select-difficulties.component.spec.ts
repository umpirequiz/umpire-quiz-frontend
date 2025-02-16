import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDifficultiesComponent } from './select-difficulties.component';

describe('SelectDifficultiesComponent', () => {
  let component: SelectDifficultiesComponent;
  let fixture: ComponentFixture<SelectDifficultiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectDifficultiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectDifficultiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
