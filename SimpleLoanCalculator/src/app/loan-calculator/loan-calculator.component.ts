import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css']
})
export class LoanCalculatorComponent implements OnInit {
  title : string = "Simple Loan Calculator";
  inputForm: FormGroup;

  minimumMonthlyIncome: number = 500000;
  minimumRequestedAmount: number = 20000000;

  constructor(private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    this.inputForm = new FormGroup( {
      'monthlyIncome': new FormControl('', [Validators.required, , this.validationForMontlyIncome.bind(this)]),
      'requestedAmount': new FormControl('', [Validators.required, , this.validationForRequestedAmount.bind(this)]),
    });
  }

  removeComma(value:string) : string {
    return (value == null)? "":value.replace(/[^0-9]+/g,'');
  }

  changeMonthlyIncomeFormat() {
    let inputValue = this.inputForm.get('monthlyIncome').value;
    console.log("changeToDecimalFormat: inputValue = ",inputValue);
    if(inputValue){
      inputValue = this.removeComma(inputValue);
      let income: string = this.decimalPipe.transform(inputValue);
      this.inputForm.get('monthlyIncome').setValue(income, {emitEvent: false });
    }
  }

  onSubmit() {
    console.log(this.inputForm);
  }
  
  validationForMontlyIncome(control: FormControl) : {[s: string]: boolean}{
    let inputValue = this.removeComma(control.value);
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
      inputValue = this.removeComma(inputValue);
      let income: string = this.decimalPipe.transform(inputValue);
      this.inputForm.get('requestedAmount').setValue(income, {emitEvent: false });
    }
  }

  validationForRequestedAmount(control: FormControl) : {[s: string]: boolean}{
    let inputValue = this.removeComma(control.value);
    console.log("validationForRequestedAmount : inputValue =", inputValue);
    if(inputValue) {
      let inputNumber: number = Number(inputValue);
      if(inputNumber<this.minimumRequestedAmount) {
        return {'minimumRequestedAmountError': true};
      }
    }  
    return null;
  }
}
