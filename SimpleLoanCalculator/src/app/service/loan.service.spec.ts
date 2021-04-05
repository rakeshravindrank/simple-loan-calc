import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoanService } from './loan.service';
import { Loan } from '../model/loan.model';

describe('LoanService', () => {
  let loanService: LoanService,
        httpTestingController: HttpTestingController,
        loan: Loan;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [ HttpClientTestingModule ],
      providers:[
        LoanService
      ]
    });
    loanService = TestBed.inject(LoanService);
    httpTestingController = TestBed.inject(HttpTestingController);
    
  });

  it('should provide response with loan amount and interest rate', () => {
    loanService.sendLoanRequest(loan).subscribe(
      loanResponse => {
        console.log(loanResponse);
        expect(loanResponse).toBeTruthy();
        expect(loanResponse.loanAmount).toBeTruthy();
        expect(loanResponse.interestRate).toBeTruthy();
      });

      const req = httpTestingController.expectOne('https://homework.fdp.workers.dev');
      expect( req.request.method).toEqual("POST");
      req.flush({"loanAmount":123000000,"interestRate":2500})

      httpTestingController.verify();
  });
});
