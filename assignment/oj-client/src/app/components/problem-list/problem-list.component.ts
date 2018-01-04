import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { Problem } from '../../models/problem.model';
import { PROBLEMS } from '../../mock-problem';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit, OnDestroy {
  problems: Problem[];
  subscribeProblems: Subscription;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getProblems();
  }

  ngOnDestroy(){
    this.subscribeProblems.unsubscribe();
  }

  getProblems(): void {
    this.subscribeProblems = this.dataService.getProblems()
                                .subscribe(problems => this.problems = problems)
  }

}
