import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Loan } from '../model/loan.model';
import { LoanResponse } from '../model/loanResponse.model';

@Injectable({
  providedIn: 'root'
}) 

export class LoanService {

  apiURL = "https://homework.fdp.workers.dev";

  httpOptions = {
    headers: new HttpHeaders({
      'X-API-KEY':'swb-222222'
    })    
  }

  constructor(private http: HttpClient) { }

  sendLoanRequest(loan:Loan): Observable<LoanResponse> {
    return this.http.post<LoanResponse>(this.apiURL, loan, this.httpOptions);
  }
}
