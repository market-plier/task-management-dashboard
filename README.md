# Task Management Dashboard

## Installation
To set up the project locally, follow these steps:

### Clone the repository:
```bash
git clone https://github.com/market-plier/task-management-dashboard.git
```
### Navigate to the project directory:

```bash
cd task-management-dashboard
```
### Install dependencies:
```bash
npm install
```

### Development server:

You can now start the development server using npm:

```bash
npm start
```
This will run `ng serve` and start the application at http://localhost:4200/. The application will automatically reload if you change any of the source files.

### Build the project:
To build the project, run:
```bash
npm run build
```
This will execute `ng build` and store the build artifacts in the dist/ directory.

### Watch for file changes:
If you want to watch for changes in the project, you can use:
```bash
npm run watch
```
This will run `ng build --watch --configuration development`.

## Live Demo

[Live Demo](https://market-plier.github.io/task-management-dashboard)

> **Note:** The page refresh may not work correctly due to limitations of GitHub Pages.  
> GitHub Pages serves static files and does not support server-side routing, which can cause  
> issues for single-page applications (SPAs) like this one. To avoid this, use the navigation  
> links within the app instead of refreshing the page.

## Design and Implementation Choices
This project was built using Angular and modern state management principles to ensure scalability, maintainability, and a seamless user experience. Below are the key design and implementation choices made during the development of this task management dashboard:

### 1. Angular Material
#### Why Angular Material?
- Angular Material provides a set of well-designed, reusable UI components that adhere to the Material Design guidelines, allowing for a consistent user experience across devices.
- It reduces development time by providing ready-to-use components.
#### Implementation Highlights:
- Theme: Used Angular Material's pre-built themes for a clean and modern look, with slight customizations to match the project’s branding.
- Card: Implemented Angular Material's mat-card to display task details in a structured and visually appealing manner.
- Table: Used mat-table to display task data, allowing users to easily view and interact with task-related information.
- Button: Utilized Angular Material's mat-button for action buttons like "Add Task" and task status updates, ensuring a consistent look and feel across the application.
### 2. NgRx for State Management
#### Why NgRx?
- NgRx provides a powerful framework for managing the state of Angular applications, using the Redux pattern to ensure predictable state transitions.
- It helps manage complex application states and provides debugging capabilities with tools like time-travel debugging.
#### Implementation Highlights:
- NgRx Entity: Used @ngrx/entity to simplify the management of collections of task entities. This allows efficient operations on task data like adding, updating, and deleting tasks.
- NgRx Effects: Implemented @ngrx/effects to handle side effects such as asynchronous operations (e.g., API calls) and to manage state transitions more cleanly.
- The store holds the application's task data, and actions, reducers, and effects are used to manipulate and retrieve the data in a predictable manner.
### 3. Modular Architecture
- The application is structured with a modular approach, which promotes reusability and maintainability. Each feature, such as task management, filtering, and user interactions, is encapsulated in dedicated Angular modules.
