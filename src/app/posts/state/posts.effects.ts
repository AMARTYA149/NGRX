import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import {
  RouterNavigatedAction,
  RouterNavigationAction,
  ROUTER_NAVIGATION,
} from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  mergeMap,
  map,
  switchMap,
  catchError,
  filter,
  withLatestFrom,
} from 'rxjs/operators';
import { Post } from 'src/app/models/posts.model';
import { PostsService } from 'src/app/services/posts.service';
import { AppState } from 'src/app/store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/store/Shared/shared.actions';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.actions';
import { Update } from '@ngrx/entity';
import { getPosts } from './posts.selectors';
import { dummyAction } from 'src/app/auth/state/auth.actions';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      withLatestFrom(this.store.select(getPosts)),
      mergeMap(([action, posts]) => {
        if (!posts.length || posts.length === 1) {
          return this.postsService.getPosts().pipe(
            map((posts) => {
              // console.log(data);
              return loadPostsSuccess({ posts });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });

  addPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPosts(action.post).pipe(
          map((data) => {
            // console.log(data);
            const post = {
              ...action.post,
              id: data.name,
            };

            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            this.router.navigate(['posts']);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const updatedPost: Update<Post> = {
              id: action.post.id!,
              changes: {
                ...action.post,
              },
            };
            return updatePostSuccess({ post: updatedPost });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = 'Post update failed';
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });

  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: any) => {
        return r.payload.routerState.params.id;
      }),
      withLatestFrom(this.store.select(getPosts)),

      switchMap(([id, posts]) => {
        if (!posts.length) {
          return this.postsService.getPostById(id).pipe(
            map((post) => {
              const postData = [{ ...post, id }];
              return loadPostsSuccess({ posts: postData });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });
}
