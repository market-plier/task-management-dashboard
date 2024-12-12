import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskActions } from '@tmd/store';
import { catchError, filter, of, take, tap } from 'rxjs';
import { selectTasksLoaded } from './selectors';

export const taskLoadGuard: CanActivateFn = (route, state) => {
    const store = inject(Store);
    return store.select(selectTasksLoaded).pipe(
        tap((loaded) => {
            if (!loaded) {
                store.dispatch(TaskActions.loadTasks());
            }
        }),
        filter((loaded) => loaded),
        take(1),
        catchError(() => of(false))
    );
};
