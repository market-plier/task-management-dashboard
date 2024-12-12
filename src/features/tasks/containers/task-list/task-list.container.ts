import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // For pagination
import { MatSort, MatSortModule } from '@angular/material/sort'; // For sorting
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Import MatTableDataSource for table data
import { Store } from '@ngrx/store';
import { selectAllTasks } from '../../state/selectors';
import { Task } from '../../state/task.model';

@Component({
    selector: 'lib-task-list',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule],
    templateUrl: './task-list.container.html',
    styleUrls: ['./task-list.container.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListContainer implements OnInit {
    private store = inject(Store);
    tasks$ = this.store.select(selectAllTasks).pipe(takeUntilDestroyed());

    displayedColumns: string[] = ['title', 'description', 'status', 'actions']; // Columns to display
    dataSource: MatTableDataSource<Task> = new MatTableDataSource();

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit(): void {
        this.tasks$.subscribe((tasks) => {
            this.dataSource.data = tasks;
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    onEdit(task: Task) {}

    onDelete(task: Task) {}
}
