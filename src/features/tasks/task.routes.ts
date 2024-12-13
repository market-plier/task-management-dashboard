import { Route } from '@angular/router';
import { AddEditTaskContainer } from './containers/add-edit-task/add-edit-task.container';
import { TaskListContainer } from './containers/task-list/task-list.container';

export default [
    { path: '', component: TaskListContainer },
    {
        path: 'new',
        component: AddEditTaskContainer,
    },
    {
        path: 'edit/:id',
        component: AddEditTaskContainer,
    },
] satisfies Route[];
