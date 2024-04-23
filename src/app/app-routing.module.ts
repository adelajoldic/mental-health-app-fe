import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/features/home/home.component";
import {EducationComponent} from "./components/features/education/education.component";
import {ProfileComponent} from "./components/features/profile/profile.component";
import {QuizComponent} from "./components/features/quiz/quiz.component";
import {RegisterComponent} from "./components/features/register/register.component";
import {LoginComponent} from "./components/features/login/login.component";
import {MoodQuizComponent} from "./components/features/mood-quiz/mood-quiz.component";
import {AnxietyQuizComponent} from "./components/features/anxiety-quiz/anxiety-quiz.component";
import {DepressionQuizComponent} from "./components/features/depression-quiz/depression-quiz.component";
import {MemoryGameComponent} from "./components/features/memory-game/memory-game.component";
import {WordsGameComponent} from "./components/features/words-game/words-game.component";
import {GamesListComponent} from "./components/features/games-list/games-list.component";
import {VideosComponent} from "./components/features/videos/videos.component";
import {MusicComponent} from "./components/features/music/music.component";
import {ExercisesComponent} from "./components/features/exercises/exercises.component";
import {VideoIntroAvatarComponent} from "./components/features/video-intro-avatar/video-intro-avatar.component";
import {GameIntroAvatarComponent} from "./components/features/game-intro-avatar/game-intro-avatar.component";
import {MusicIntroComponent} from "./components/features/music-intro/music-intro.component";
import {ExerciseIntroComponent} from "./components/features/exercise-intro/exercise-intro.component";

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
    path: "education-ena",
    component: VideoIntroAvatarComponent,
  },
  {
    path: "education",
    component: EducationComponent,
  },
  {
    path: "games-ena",
    component: GameIntroAvatarComponent,
  },
  {
    path: "games",
    component: GamesListComponent,
  },
  {
    path: "quiz",
    component: QuizComponent,
  },

  {
    path: "mood-quiz",
    component: MoodQuizComponent,
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
  },
  {
    path: "music-ena",
    component: MusicIntroComponent,
  },
  {
    path: "music",
    component: MusicComponent,
  },
  {
    path: "exercises-ena",
    component: ExerciseIntroComponent,
  },
  {
    path: "exercises",
    component: ExercisesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
