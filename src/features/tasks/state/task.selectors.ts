import { createSelector } from '@ngrx/store';
import { tasksFeature } from './task.reducer';

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
    selectLoading,
    selectLoaded,
} = tasksFeature;
export {
    selectAll as selectAllTasks,
    selectEntities as selectTaskEntities,
    selectIds as selectTaskIds,
    selectLoaded as selectTasksLoaded,
    selectLoading as selectTasksLoading,
    selectTotal as selectTotalTasks,
};

export const selectTaskById = (id: string) =>
    createSelector(selectEntities, (entities) => entities[id]);
