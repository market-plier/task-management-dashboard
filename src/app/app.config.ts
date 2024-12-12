import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { TaskEffects, tasksFeature } from '@tmd/store';
import { fakeBackendProvider } from '@tmd/tasks/services/interceptors/fake-backend.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideStore(),
        provideState(tasksFeature),
        provideEffects(TaskEffects),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),

        fakeBackendProvider,
    ],
};
