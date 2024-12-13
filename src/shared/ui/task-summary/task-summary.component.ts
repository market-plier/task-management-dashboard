
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'ui-task-summary',
    standalone: true,
    imports: [MatCardModule, MatIconModule],
    templateUrl: './task-summary.component.html',
    styleUrls: ['./task-summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskSummaryComponent {
    @Input() status!: 'Pending' | 'Completed';
    @Input() count = 0;

    get icon(): string {
        return this.status === 'Completed' ? 'check_circle' : 'hourglass_empty';
    }

    get color(): string {
        return this.status === 'Completed' ? 'green' : 'orange';
    }
}
