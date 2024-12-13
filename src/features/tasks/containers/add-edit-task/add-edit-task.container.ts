import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Task, TaskActions, TaskStatus } from '@tmd/store';
import {
    selectTaskById,
    selectTasksLoading,
} from '@tmd/tasks/state/task.selectors';

@Component({
    selector: 'app-add-edit-task',
    standalone: true,
    imports: [
        MatProgressSpinnerModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
    ],
    templateUrl: './add-edit-task.container.html',
    styleUrl: './add-edit-task.container.scss',
})
export class AddEditTaskContainer implements OnInit {
    private store = inject(Store);
    private destroy$ = inject(DestroyRef);
    private fb = inject(FormBuilder);

    @Input() id?: string;

    get isEditMode() {
        return !!this.id;
    }

    taskForm!: FormGroup;

    statuses = Object.values(TaskStatus);

    loading$ = this.store.select(selectTasksLoading);

    ngOnInit(): void {
        this.initForm();
        if (this.id) {
            this.store
                .select(selectTaskById(this.id))
                .pipe(takeUntilDestroyed(this.destroy$))
                .subscribe((task) => {
                    if (task) {
                        this.taskForm.patchValue(task);
                    }
                });
        }
    }

    initForm() {
        this.taskForm = this.fb.group({
            title: ['', Validators.required],
            description: [''],
            status: [TaskStatus.Pending],
        });
    }

    onSubmit() {
        if (this.taskForm.invalid) {
            return;
        }

        const task: Task = {
            id: this.id,
            ...this.taskForm.value,
        };

        this.store.dispatch(TaskActions.upsertTask({ task }));
    }
}
