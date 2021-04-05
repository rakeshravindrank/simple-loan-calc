import { DecimalPipe } from '@angular/common';
import { HttpTestingController } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoanService } from '../service/loan.service';

import { AppComponent } from '../app.component';
import { LoanCalculatorComponent } from './loan-calculator.component';

describe('LoanCalculatorComponent', () => {
  let component: LoanCalculatorComponent;
  let fixture: ComponentFixture<LoanCalculatorComponent>;
  let el: DebugElement;
  let loanService: LoanService;

  beforeEach(async(() => {

    const loanServiceSpy = jasmine.createSpyObj('LoanService', ['sendLoanRequest']);

    TestBed.configureTestingModule({
      declarations: [ AppComponent, LoanCalculatorComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        DecimalPipe, 
        {provide: LoanService, useValue: loanServiceSpy}
      ]
    }).compileComponents()
      .then(()=> {
        fixture = TestBed.createComponent(LoanCalculatorComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        el = fixture.debugElement;
        loanService = TestBed.inject(LoanService);        
      });

    
  }));
 

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`form should have as title 'Simple Loan Calculator'`, () => {    
    expect(component.title).toEqual('Simple Loan Calculator');
  });

  it(`form should be invalid when empty`, () => {
    expect(component.inputForm.valid).toBeFalsy();
  });

  it(`Monthly income should be invalid on form load`, () => {
    let monthlyIncome = component.inputForm.controls['monthlyIncome'];
    expect(monthlyIncome.valid).toBeFalsy();
  });  

  it(`Requested amount should be invalid on form load`, () => {   
    let requestedAmount =  component.inputForm.controls['requestedAmount'];
    expect(requestedAmount.valid).toBeFalsy();
  });

  it(`Loan term should be invalid on form load`, () => {
    let loanTerm = component.inputForm.controls['loanTerm'];
    expect(loanTerm.valid).toBeFalsy();
  });

  it(`children should be invalid on form load`, () => {
    let children = component.inputForm.controls['children'];
    expect(children.valid).toBeFalsy();
  });

  it(`coapplicant should be invalid on form load`, () => {
    let coapplicant = component.inputForm.controls['coapplicant'];
    expect(coapplicant.valid).toBeFalsy();
  });

  it(`Monthly salary should be required`, () => {
    let errors = {};
    let monthlyIncome = component.inputForm.controls['monthlyIncome'];
    errors = monthlyIncome.errors;
    expect(errors['required']).toBeTruthy();
  });

  it(`Requested amount should be required`, () => {
    let errors = {};
    let requestedAmount = component.inputForm.controls['requestedAmount'];
    errors = requestedAmount.errors;
    expect(errors['required']).toBeTruthy();
  });

  it(`Loan term should be required`, () => {
    let errors = {};
    let loanTerm = component.inputForm.controls['loanTerm'];
    errors = loanTerm.errors;
    expect(errors['required']).toBeTruthy();
  });

  it(`Children should be required`, () => {
    let errors = {};
    let children = component.inputForm.controls['children'];
    errors = children.errors;
    expect(errors['required']).toBeTruthy();
  });

  it(`Coapplicant should be required`, () => {
    let errors = {};
    let coapplicant = component.inputForm.controls['coapplicant'];
    errors = coapplicant.errors;
    expect(errors['required']).toBeTruthy();
  });

  it(`Monthly income is invalid when value is less than 500`, () => {
    let errors = {};
    let monthlyIncome = component.inputForm.controls['monthlyIncome'];
    monthlyIncome.setValue("200");
    errors = monthlyIncome.errors;
    expect(errors['minimumMonthlyIncomeError']).toBeTruthy();
  });

  it(`Monthly income is valid when value is more than 500`, () => {   
    let monthlyIncome = component.inputForm.controls['monthlyIncome'];
    monthlyIncome.setValue("501");
    expect(monthlyIncome.valid).toBeTruthy();
  });

  it(`Requested amount is invalid when value is less than 20000`, () => {
    let errors = {};
    let requestedAmount = component.inputForm.controls['requestedAmount'];
    requestedAmount.setValue("19000");
    errors = requestedAmount.errors;
    expect(errors['minimumRequestedAmountError']).toBeTruthy();
  });
 
  it(`Requested amount is valid when value is more than 20000`, () => {
    let requestedAmount = component.inputForm.controls['requestedAmount'];
    requestedAmount.setValue("20001");
    expect(requestedAmount.valid).toBeTruthy();
  });

  it(`loan term is invalid when value is less than 36 and more than 360`, () => {
    let loanTerm = component.inputForm.controls['loanTerm'];
    loanTerm.setValue("35");    
    expect(loanTerm.invalid).toBeTrue;
    loanTerm.setValue("361");  
    expect(loanTerm.invalid).toBeTrue;
  });

  it(`loan term is valid when value is between  36 and 360`, () => {
    let loanTerm = component.inputForm.controls['loanTerm'];
    loanTerm.setValue("36");    
    expect(loanTerm.valid).toBeTrue;
    loanTerm.setValue("360");    
    expect(loanTerm.valid).toBeTrue;
  });

  it(`submit form cannot be submitted without entering any value`, () => {    
    fixture.debugElement.query(By.css('form')).triggerEventHandler('click', null);
    expect(component.inputForm.valid).toBeFalsy();
  });

  it(`submit form submitted with all values`, () => { 
    let monthlyIncome = component.inputForm.controls['monthlyIncome'];
    monthlyIncome.setValue("501");
    let loanTerm = component.inputForm.controls['loanTerm'];
    loanTerm.setValue("36");    
    let requestedAmount = component.inputForm.controls['requestedAmount'];
    requestedAmount.setValue("20001");
    let children = component.inputForm.controls['children'];
    children.setValue("NONE");
    let coapplicant = component.inputForm.controls['coapplicant'];
    coapplicant.setValue("NONE");    
    expect(component.inputForm.valid).toBeTruthy();
  });
});
