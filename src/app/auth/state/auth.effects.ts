import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import {
  autoLogin,
  loginStart,
  loginSuccess,
  signUpStart,
  signUpSuccess,
} from './auth.actions';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  repeat,
  tap,
} from 'rxjs/operators';
import { createAction, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/store/Shared/shared.actions';
import { of } from 'rxjs';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginStart),
        exhaustMap((action) => {
          return this.authService.login(action.email, action.password).pipe(
            map((data) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              const user = this.authService.formatUser(data);
              this.authService.setUserInLocalStorage(user);
              return loginSuccess({ user });
            }),
            catchError((errResp) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));

              const errorMessage = this.authService.getErrorMessage(
                errResp.error.error.message
              );
              return of(setErrorMessage({ message: errorMessage }));
            })
          );
        })
      );
    }
    // { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signUpSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  // signUpRedirect$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(signUpSuccess),
  //       tap((action) => {
  //         this.store.dispatch(setErrorMessage({ message: '' }));

  //         this.router.navigate(['/']);
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUpStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);

            return signUpSuccess({ user });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));

            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogin),
        map((action) => {
          const user = this.authService.getUserFromLocalStorage();
          console.log(user);
        })
      );
    },
    { dispatch: false }
  );
}
