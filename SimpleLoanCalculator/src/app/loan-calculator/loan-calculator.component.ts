import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Loan } from '../model/loan.model';
import { LoanResponse } from '../model/loanResponse.model';
import { LoanService } from '../service/loan.service';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css']
})
export class LoanCalculatorComponent implements OnInit {
  
  inputForm: FormGroup;
  error: string [] = [];
  loanResponse: LoanResponse = null;
  AMOUNT_CONVERSION_CONST:number = 1000;

  title : string = "Simple Loan Calculator";
  minimumMonthlyIncome: number = 500.000;
  minimumRequestedAmount: number = 20000.000;
  childrenArray = ['NONE', 'SINGLE', ' MULTIPLE'];
  coapplicantArray = ['NONE', 'SINGLE_BORROWER', ' MULTIPLE_BORROWERS'];

  constructor(private decimalPipe: DecimalPipe, private loanService: LoanService ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.inputForm = new FormGroup( {
      'monthlyIncome': new FormControl('', [Validators.required, , this.validationForMontlyIncome.bind(this)]),
      'requestedAmount': new FormControl('', [Validators.required, , this.validationForRequestedAmount.bind(this)]),
      'loanTerm': new FormControl('', [Validators.required, Validators.min(36), Validators.max(360)]),
      'children': new FormControl('', [Validators.required]),
      'coapplicant': new FormControl('', [Validators.required]),
    });
  }

  removeOtherCharacters(value:string) : string { 
    let decimalDotExist = false;
    let index = 0;
    if(value != null) { 
      console.log("removeOtherCharacters:b4value =",value);     
      if(value.indexOf('.')> -1) {
        index = value.indexOf('.');
        decimalDotExist = true;
        console.log("removeOtherCharacters:b4value index =",index);      
        console.log("removeOtherCharacters:value =",value);
        
        //before and after length from the first decimal point found from right side
        //newValue is the value till first dot and will be used for length calculation
        let newValue = value.slice(0,index);
        let beforeLength = newValue.length;
        console.log("b4 length =",beforeLength);
        newValue = (newValue == null)? "":newValue.replace(/[^0-9]+/g,'');
        let afterLength = newValue.length;
        console.log("after length =",afterLength);
        //finding decimal point location logic ends

        value = (value == null)? "":value.replace(/[^0-9]+/g,'');
        if(index>0 && beforeLength != afterLength) {
          let diff = beforeLength-afterLength;
          index = index - diff ;
        }
        if(decimalDotExist) {
          decimalDotExist = false;        
          value = value.slice(0,index)+'.'+value.slice(index,value.length+1);
          index = 0;
        }
      } else {
        return (value == null)? "":value.replace(/[^0-9]+/g,'');
      }      
    }
    console.log("removeOtherCharacters:aftervalue =",value);
    return value;
  }

  changeMonthlyIncomeFormat() {
    let inputValue = this.inputForm.get('monthlyIncome').value;
    console.log("changeToDecimalFormat: inputValue = ",inputValue);
    if(inputValue){
      inputValue = this.removeOtherCharacters(inputValue);
      let income: string = this.decimalPipe.transform(inputValue);
      this.inputForm.get('monthlyIncome').setValue(income, {emitEvent: false });
    }
  }
  
  validationForMontlyIncome(control: FormControl) : {[s: string]: boolean}{
    let inputValue = this.removeOtherCharacters(control.value);
    console.log("validationForMontlyIncome: inputValue =", inputValue);
    if(inputValue) {
      let inputNumber: number = Number(inputValue);
      if(inputNumber<this.minimumMonthlyIncome) {
        return {'minimumMonthlyIncomeError': true};
      }
    } 
    return null;
  }

  changeRequestedAmountFormat() {
    let inputValue = this.inputForm.get('requestedAmount').value;
    console.log("changeRequestedAmountFormat: inputValue = ",inputValue);
    if(inputValue){
      inputValue = this.removeOtherCharacters(inputValue);
      let income: string = this.decimalPipe.transform(inputValue);
      this.inputForm.get('requestedAmount').setValue(income, {emitEvent: false });
    }
  }

  validationForRequestedAmount(control: FormControl) : {[s: string]: boolean}{
    let inputValue = this.removeOtherCharacters(control.value);
    console.log("validationForRequestedAmount : inputValue =", inputValue);
    if(inputValue) {
      let inputNumber: number = Number(inputValue);
      if(inputNumber<this.minimumRequestedAmount) {
        return {'minimumRequestedAmountError': true};
      }
    }  
    return null;
  }  

  onSubmit() {
    this.error = [];
    this.loanResponse = null;
    let loan = this.createPostData();
    console.log(this.inputForm);
    this.loanService.sendLoanRequest(loan).subscribe(
      response => {
        if(response!=null) {
          this.loanResponse = new LoanResponse();
          this.loanResponse.loanAmount = response.loanAmount/this.AMOUNT_CONVERSION_CONST;
          this.loanResponse.interestRate = response.interestRate/this.AMOUNT_CONVERSION_CONST;
        }
        console.log("response =",response);
        console.log("loanResponse =",this.loanResponse);
      },
      error => {
        debugger;
        if (error instanceof HttpErrorResponse) { 
          if (error.error instanceof ErrorEvent || error.error instanceof ProgressEvent) {
            this.error.push("Something wrong happened while getting response. Please contact administrator!!!");
            console.log(error.message);
          } else {
              if(error && error.error && error.error.fields[0] && error.error.fields[0].message)
              {
                debugger; 
                let field = error.error.fields;
                field.forEach((element: { message: string; }) => {
                  this.error.push(element.message);            
                });          
              }
           }
        } else {
          this.error.push("Something wrong happened. Please contact administrator!!!");
        }
      }
    )
  }


  createPostData(): Loan {
    let loan = new Loan();    
    loan.monthlyIncome = this.inputForm.get('monthlyIncome').value * this.AMOUNT_CONVERSION_CONST;
    loan.requestedAmount =  this.inputForm.get('requestedAmount').value * this.AMOUNT_CONVERSION_CONST;
    loan.loanTerm = this.inputForm.get('loanTerm').value;
    loan.children = this.inputForm.get('children').value;
    loan.coapplicant = this.inputForm.get('coapplicant').value;
    return loan;
  }
}
