import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskSummaryComponent } from '@tmd/shared/ui';
import { TaskStatus } from '@tmd/store';
import { selectAllTasks } from '@tmd/tasks/state/selectors';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [TaskSummaryComponent, CommonModule],
    templateUrl: './home.container.html',
    styleUrls: ['./home.container.scss'],
})
export class HomeContainer {
    pendingCount$: Observable<number>;
    completedCount$: Observable<number>;

    constructor(private store: Store) {
        const allTasks$ = this.store.select(selectAllTasks);

        this.pendingCount$ = allTasks$.pipe(
            map(
                (tasks) =>
                    tasks.filter((task) => task.status === TaskStatus.Pending)
                        .length
            )
        );

        this.completedCount$ = allTasks$.pipe(
            map(
                (tasks) =>
                    tasks.filter((task) => task.status === TaskStatus.Completed)
                        .length
            )
        );
    }
}
