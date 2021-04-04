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

  minimumMonthlyIncome: number = 500.000;
  minimumRequestedAmount: number = 20000.000;
  childrenArray = ['NONE', 'SINGLE', ' MULTIPLE'];
  coapplicantArray = ['NONE', 'SINGLE_BORROWER', ' MULTIPLE_BORROWERS'];

  constructor(private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
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
        //placing decimal logic ends

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

  onSubmit() {

    console.log(this.inputForm);
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
}
