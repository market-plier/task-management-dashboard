import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { TaskRepository } from '../services/task.repo';
import { TaskActions } from './task.actions';

@Injectable()
export class TaskEffects {
    private readonly taskRepo = inject(TaskRepository);
    private readonly actions$ = inject(Actions);
    private readonly router = inject(Router);

    loadTasks$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TaskActions.loadTasks),
            concatMap(() =>
                this.taskRepo.loadTasks().pipe(
                    map((data) =>
                        TaskActions.loadTasksSuccess({ tasks: data })
                    ),
                    catchError((error) =>
                        of(TaskActions.loadTasksFailure({ error }))
                    )
                )
            )
        );
    });

    // Upsert Task Effect (Create or Update)
    upsertTask$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TaskActions.upsertTask),
            concatMap(({ task }) =>
                this.taskRepo.upsertTask(task).pipe(
                    map((data) => {
                        this.router.navigate(['/tasks']);
                        return TaskActions.upsertTaskSuccess({ task: data });
                    }),
                    catchError((error) =>
                        of(TaskActions.upsertTaskFailure({ error }))
                    )
                )
            )
        );
    });

    // Delete Task Effect
    deleteTask$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TaskActions.deleteTask),
            concatMap(({ id }) =>
                this.taskRepo.deleteTask(id).pipe(
                    map(() => TaskActions.deleteTaskSuccess({ id })),
                    catchError((error) =>
                        of(TaskActions.deleteTaskFailure({ error }))
                    )
                )
            )
        );
    });
}
