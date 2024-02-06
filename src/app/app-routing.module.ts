import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/features/home/home.component";
import {EducationComponent} from "./components/features/education/education.component";
import {ProfileComponent} from "./components/features/profile/profile.component";
import {GamesComponent} from "./components/features/games/games.component";
import {RegisterComponent} from "./components/features/register/register.component";
import {LoginComponent} from "./components/features/login/login.component";
import {FirstQuizComponent} from "./components/features/first-quiz/first-quiz.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "home",
    component: EducationComponent,
  },
  {
    path: "games",
    component: GamesComponent,
  },
  {
    path: "first-quiz",
    component: FirstQuizComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
