import { tasksFeature } from './task.reducer';

const { selectIds, selectEntities, selectAll, selectTotal, selectLoaded } =
    tasksFeature;
export {
    selectAll as selectAllTasks,
    selectEntities as selectTaskEntities,
    selectIds as selectTaskIds,
    selectLoaded as selectTasksLoaded,
    selectTotal as selectTotalTasks,
};
