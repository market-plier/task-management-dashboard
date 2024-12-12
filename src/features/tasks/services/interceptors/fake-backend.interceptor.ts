import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { delay, dematerialize, materialize } from 'rxjs/operators';
import { Task } from '../../state/task.model';
// array in local storage for registered users

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const { url, method, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/tasks') && method === 'GET':
                    return getTasks();
                case url.endsWith('/tasks') && method === 'POST':
                    return createTask();
                case url.match(/\/tasks\/\w+$/) && method === 'PUT':
                    return updateTask();
                case url.match(/\/tasks\/\w+$/) && method === 'DELETE':
                    return deleteTask();
                default:
                    return next.handle(request);
            }
        }

        function getTasks() {
            const tasks = getStoredTasks();
            return ok(tasks);
        }

        function createTask() {
            const tasks = getStoredTasks();
            const newTask: Task = { ...body, id: generateId() };
            tasks.push(newTask);
            setStoredTasks(tasks);
            return ok(newTask);
        }

        function updateTask() {
            const tasks = getStoredTasks();
            const updatedTask = body as Task;
            const index = tasks.findIndex((task) => task.id === updatedTask.id);
            if (index === -1) return error('Task not found');
            tasks[index] = updatedTask;
            setStoredTasks(tasks);
            return ok(updatedTask);
        }

        function deleteTask() {
            const tasks = getStoredTasks();
            const id = url.split('/').pop();
            const index = tasks.findIndex((task) => task.id === id);
            if (index === -1) return error('Task not found');
            tasks.splice(index, 1);
            setStoredTasks(tasks);
            return ok();
        }

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body })).pipe(
                materialize(),
                delay(500),
                dematerialize()
            );
        }

        function error(message: string) {
            return throwError(() => ({ error: { message } }));
        }

        function getStoredTasks(): Task[] {
            const storedTasks = localStorage.getItem('tasks');
            return storedTasks ? JSON.parse(storedTasks) : [];
        }

        function setStoredTasks(tasks: Task[]) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function generateId(): string {
            return crypto.randomUUID();
        }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true,
};
