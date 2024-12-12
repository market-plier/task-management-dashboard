import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { TaskActions } from './task.actions';
import { Task } from './task.model';

export const tasksFeatureKey = 'tasks';

export interface State extends EntityState<Task> {
    loaded: boolean;
    error: any;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: State = adapter.getInitialState({
    loaded: false,
    error: {},
});

export const reducer = createReducer(
    initialState,
    on(TaskActions.loadTasks, (state) => ({ ...state, loaded: false })),
    on(TaskActions.loadTasksSuccess, (state, action) =>
        adapter.setAll(action.tasks, { ...state, loaded: true })
    ),
    on(TaskActions.loadTasksFailure, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(TaskActions.upsertTaskSuccess, (state, action) =>
        adapter.upsertOne(action.task, state)
    ),
    on(TaskActions.upsertTaskFailure, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(TaskActions.deleteTaskSuccess, (state, action) =>
        adapter.removeOne(action.id, state)
    ),
    on(TaskActions.deleteTaskFailure, (state, action) => ({
        ...state,
        error: action.error,
    }))
);

export const tasksFeature = createFeature({
    name: tasksFeatureKey,
    reducer,
    extraSelectors: ({ selectTasksState }) => ({
        ...adapter.getSelectors(selectTasksState),
    }),
});
