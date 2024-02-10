import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/features/home/home.component";
import {EducationComponent} from "./components/features/education/education.component";
import {ProfileComponent} from "./components/features/profile/profile.component";
import {QuizComponent} from "./components/features/quiz/quiz.component";
import {RegisterComponent} from "./components/features/register/register.component";
import {LoginComponent} from "./components/features/login/login.component";
import {FirstQuizComponent} from "./components/features/first-quiz/first-quiz.component";
import {AnxietyQuizComponent} from "./components/features/anxiety-quiz/anxiety-quiz.component";
import {DepressionQuizComponent} from "./components/features/depression-quiz/depression-quiz.component";
import {MemoryGameComponent} from "./components/features/memory-game/memory-game.component";
import {WordsGameComponent} from "./components/features/words-game/words-game.component";
import {GamesListComponent} from "./components/features/games-list/games-list.component";
import {VideosComponent} from "./components/features/videos/videos.component";

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
    path: "quiz",
    component: QuizComponent,
  },
  {
    path: "games",
    component: GamesListComponent,
  },
  {
    path: "first-quiz",
    component: FirstQuizComponent,
  },
  {
    path: "anxiety-quiz",
    component: AnxietyQuizComponent,
  },
  {
    path: "depression-quiz",
    component: DepressionQuizComponent,
  },
  {
    path: "memory-game",
    component: MemoryGameComponent,
  },
  {
    path: "words-game",
    component: WordsGameComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    path: "videos",
    component: VideosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
