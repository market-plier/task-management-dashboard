import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../state/task.model';

@Injectable({
    providedIn: 'root',
})
export class TaskRepository {
    private apiUrl = `api/tasks`;

    constructor(private http: HttpClient) {}

    loadTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
    }

    upsertTask(task: Task): Observable<Task> {
        const url = `${this.apiUrl}/${task.id}`;
        const request$ = task.id
            ? this.http.put<Task>(url, task)
            : this.http.post<Task>(this.apiUrl, task);

        return request$;
    }

    deleteTask(id: string): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}
