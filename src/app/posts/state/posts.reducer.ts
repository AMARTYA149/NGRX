import { Action, createReducer } from '@ngrx/store';
import { initialState, PostsState } from './posts.state';

const _postsReducer = createReducer(initialState);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return _postsReducer(state, action);
}
