// import { counterReducer } from '../counter/state/counter.reducer';
// import { CounterState } from '../counter/state/counter.state';
// import { postsReducer } from '../posts/state/posts.reducer';
// import { PostsState } from '../posts/state/posts.state';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { AuthReducer } from '../auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../auth/state/auth.selector';
import { AuthState } from '../auth/state/auth.state';
import { SharedReducer } from './Shared/shared.reducer';
import { SHARED_STATE_NAME } from './Shared/shared.selector';
import { SharedState } from './Shared/shared.state';

export interface AppState {
  // counter: CounterState;
  // posts: PostsState;
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  router: RouterReducerState;
}

export const appReducer = {
  // counter: counterReducer,
  // posts: postsReducer,
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  router: routerReducer,
};
