import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/features/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { EducationComponent } from './components/features/education/education.component';
import { LoginComponent } from './components/features/login/login.component';
import { RegisterComponent } from './components/features/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './components/features/profile/profile.component';
import { GamesComponent } from './components/features/games/games.component';
import { FooterComponent } from './components/footer/footer.component';
import { FirstQuizComponent } from './components/features/first-quiz/first-quiz.component';
import { AnxietyQuizComponent } from './components/features/anxiety-quiz/anxiety-quiz.component';
import { DepressionQuizComponent } from './components/features/depression-quiz/depression-quiz.component';
import { MemoryGameComponent } from './components/features/memory-game/memory-game.component';
import { ListeningComponent } from './components/features/listening/listening.component';
import { KnowledgeComponent } from './components/features/knowledge/knowledge.component';
import { WordsGameComponent } from './components/features/words-game/words-game.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    EducationComponent,

    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    GamesComponent,
    FooterComponent,
    FirstQuizComponent,
    AnxietyQuizComponent,
    DepressionQuizComponent,
    MemoryGameComponent,
    ListeningComponent,
    KnowledgeComponent,
    WordsGameComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
