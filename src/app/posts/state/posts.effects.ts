import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { PostsService } from 'src/app/services/posts.service';
import { loadPosts, loadPostsSuccess } from './posts.actions';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postsService.getPosts().pipe(
          map((posts) => {
            // console.log(data);
            return loadPostsSuccess({ posts });
          })
        );
      })
    );
  });
}
