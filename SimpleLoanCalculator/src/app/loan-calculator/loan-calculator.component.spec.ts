import { DecimalPipe } from '@angular/common';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { LoanCalculatorComponent } from './loan-calculator.component';

describe('LoanCalculatorComponent', () => {
  let component: LoanCalculatorComponent;
  let fixture: ComponentFixture<LoanCalculatorComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanCalculatorComponent ],
      imports: [ReactiveFormsModule],
      providers: [DecimalPipe]
    })
    .compileComponents()
    .then(()=> {
      fixture = TestBed.createComponent(LoanCalculatorComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Simple Loan Calculator'`, () => {    
    expect(component.title).toEqual('Simple Loan Calculator');
  });

  it(`should have as title 'Simple Loan Calculator'`, () => {    
    expect(component.title).toEqual('Simple Loan Calculator');
  });

  it(`should have display element named 'Monthly Income'`, () => {
    //expect(el.queryAll(By.name('monthlyIncome')));
  });
});
