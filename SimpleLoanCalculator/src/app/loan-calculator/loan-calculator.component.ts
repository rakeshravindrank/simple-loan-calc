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

  constructor(private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    this.inputForm = new FormGroup( {
      'monthlyIncome': new FormControl('', [Validators.required, , this.validationForMontlyIncome.bind(this)]),
    });
  }

  removeComma(value:string) : string {
    return (value == null)? "":value.replace(/[^0-9]+/g,'');
  }

  changeToDecimalFormat() {
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
    console.log("inputValue =", inputValue);
    if(inputValue) {
      let inputNumber: number = Number(inputValue);
      if(inputNumber<500000) {
        return {'minimumMonthlyIncomeError': true};
      }
    }  
    return null;
  }
}
