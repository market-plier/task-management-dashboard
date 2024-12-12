import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListContainer } from './task-list.container';

describe('TaskListContainer', () => {
    let component: TaskListContainer;
    let fixture: ComponentFixture<TaskListContainer>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TaskListContainer],
        }).compileComponents();

        fixture = TestBed.createComponent(TaskListContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
