import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CounterButtonComponent } from './counter/counter-button/counter-button.component';
import { CounterOutputComponent } from './counter/counter-output/counter-output.component';
import { CounterComponent } from './counter/counter/counter.component';
import { CustomCounterInputComponent } from './counter/custom-counter-input/custom-counter-input.component';
import { counterReducer } from './counter/state/counter.reducer';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducer } from './store/app.state';
import { AddPostComponent } from './posts/add-post/add-post.component';
// import { postsReducer } from './posts/state/posts.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterButtonComponent,
    CounterOutputComponent,
    CustomCounterInputComponent,
    HomeComponent,
    HeaderComponent,
    PostsListComponent,
    AddPostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
