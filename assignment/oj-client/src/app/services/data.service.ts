import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';

import { Problem } from '../models/problem.model';
import { PROBLEMS } from '../mock-problem';

@Injectable()
export class DataService {
  // problems: Problem[] = PROBLEMS;
  private _problemSource = new BehaviorSubject<Problem[]> ([]);
  constructor(private httpClient: HttpClient) { }

  // observable: values, complete, error
  getProblems(): Observable<Problem[]> {
    this.httpClient.get('api/v1/problems')
      .toPromise()
      .then((res: any) => {
          this._problemSource.next(res);
      })
      .catch(this.handelError);
    return this._problemSource;
  }

  getProblem(id: number): Promise<Problem> {
    return this.httpClient.get(`{api/v1/problems/$(id)}`)
      .toPromise()
      .then((res: any) => res)
      .catch(this.handelError);
  }

  addProblem(problem: Problem): Promise<Problem> {
    const options = {headers: new HttpHeader({'Content-Type': 'application/json'})};

    return this.httpClient.post('api/v1/problems')
      .toPromise()
      .then((res: any) => {
        this.getProblems();
        return res;
      })
      .catch(this.handelError);
  }

  private handelError(error: any): Promise<any>{
    return Promise.reject(error.body || error );
  }
}
