export enum TaskStatus {
    Pending = 'Pending',
    Completed = 'Completed',
}
export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
}
