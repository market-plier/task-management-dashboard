import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    ViewChild,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // For pagination
import { MatSort, MatSortModule } from '@angular/material/sort'; // For sorting
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Import MatTableDataSource for table data
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from '@tmd/shared/ui';
import { TaskActions } from '@tmd/store';
import { Task } from '../../state/task.model';
import { selectAllTasks } from '../../state/task.selectors';

@Component({
    selector: 'lib-task-list',
    standalone: true,
    imports: [
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        RouterLink,
    ],
    templateUrl: './task-list.container.html',
    styleUrls: ['./task-list.container.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListContainer {
    private store = inject(Store);
    private router = inject(Router);
    private dialog = inject(MatDialog);
    tasks = toSignal(
        this.store.select(selectAllTasks).pipe(takeUntilDestroyed())
    );

    displayedColumns: string[] = ['title', 'description', 'status', 'actions']; // Columns to display
    dataSource = new MatTableDataSource<Task>();

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor() {
        effect(() => {
            this.dataSource.data = this.tasks() ?? [];
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    onEditClick(task: Task) {
        this.router.navigate(['/tasks', 'edit', task.id]);
    }

    onDeleteClick(task: Task) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                title: 'Delete Task',
                message: `Are you sure you want to delete the task: "${task.title}"?`,
            },
        });

        dialogRef.afterClosed().subscribe((confirmed) => {
            if (confirmed) {
                this.store.dispatch(TaskActions.deleteTask({ id: task.id }));
            }
        });
    }
}
