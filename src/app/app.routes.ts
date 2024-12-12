import { Routes } from '@angular/router';
import { HomeContainer } from '@tmd/home';
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
                path: 'home',
                component: HomeContainer,
            },
            {
                path: 'tasks',
                loadChildren: () => import('@tmd/tasks/task.routes'),
            },
        ],
    },
    { path: '**', redirectTo: '' },
];
