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
      'monthlyIncome': new FormControl('', [Validators.required]),
    });
  }

  removeComma(value:string) : string{
    return value.replace(/[,]+/g,'');
  }

  changeToDecimalFormat() {
    let inputValue = this.removeComma(this.inputForm.get('monthlyIncome').value);
    let income: string = this.decimalPipe.transform(inputValue);
    this.inputForm.get('monthlyIncome').setValue(income);
  }

  onSubmit() {
    console.log(this.inputForm);
  }

}
