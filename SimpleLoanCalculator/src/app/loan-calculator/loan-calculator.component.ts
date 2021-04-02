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
  constructor() { }

  ngOnInit(): void {
    this.inputForm = new FormGroup( {
      'monthlyIncome': new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.inputForm);
  }

}
