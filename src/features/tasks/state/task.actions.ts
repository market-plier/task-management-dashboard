import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Task } from './task.model';

export const TaskActions = createActionGroup({
    source: 'Task/API',
    events: {
        'Load Tasks': emptyProps(),
        'Load Tasks Success': props<{ tasks: Task[] }>(),
        'Load Tasks Failure': props<{ error: any }>(),

        'Upsert Task': props<{ task: Task }>(),
        'Upsert Task Success': props<{ task: Task }>(),
        'Upsert Task Failure': props<{ error: any }>(),

        'Delete Task': props<{ id: string }>(),
        'Delete Task Success': props<{ id: string }>(),
        'Delete Task Failure': props<{ error: any }>(),
    },
});
