import { Routes } from '@angular/router';
import { taskLoadGuard } from '@tmd/store';

export const routes: Routes = [
    {
        path: '',
        canActivate: [taskLoadGuard],
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
            {
                path: 'tasks',
                loadChildren: () => import('@tmd/tasks/task.routes'),
            },
        ],
    },
    { path: '**', redirectTo: '' },
];
