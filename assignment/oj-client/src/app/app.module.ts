import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing } from './app.routes';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AuthService } from './auth/auth.service';

import { AppComponent } from './app.component';
import { ProblemListComponent} from './components/problem-list/problem-list.component';

import { DataService } from './services/data.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';


@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    NavbarComponent,
    ProblemDetailComponent,
    NewProblemComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
