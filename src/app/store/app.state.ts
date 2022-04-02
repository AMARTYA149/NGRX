// import { counterReducer } from '../counter/state/counter.reducer';
// import { CounterState } from '../counter/state/counter.state';
// import { postsReducer } from '../posts/state/posts.reducer';
// import { PostsState } from '../posts/state/posts.state';
import { SharedReducer } from './Shared/shared.reducer';
import { SHARED_STATE_NAME } from './Shared/shared.selector';
import { SharedState } from './Shared/shared.state';

export interface AppState {
  // counter: CounterState;
  // posts: PostsState;
  [SHARED_STATE_NAME]: SharedState;
}

export const appReducer = {
  // counter: counterReducer,
  // posts: postsReducer,
  [SHARED_STATE_NAME]: SharedReducer,
};
