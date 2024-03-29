# ckt-gantt-react

## Note
Cette librairie est issu d'une [Librairie de MateMaTuK](https://github.com/MaTeMaTuK/gantt-task-react)
Un simple couche a été développé pour facilité l'utilisation de la librairie.

## Interactive Gantt Chart for React with TypeScript.

![example](https://user-images.githubusercontent.com/26743903/88215863-f35d5f00-cc64-11ea-81db-e829e6e9b5c8.png)

## [Live Demo](https://matematuk.github.io/gantt-task-react/)

## Install

```
npm install @c-koya-tech/ckt-react-gantt
```

## How to use it

```javascript
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
let tasks: Task[] = [
    {
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 3),
      name: 'Project 1',
      id: 'project-1',
      type:'project',
      progress: 45,
      isDisabled: true,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
      tasks:[
        {
            start: new Date(2020, 1, 1),
            end: new Date(2020, 1, 2),
            name: 'Tâche 1',
            id: 'task-1',
            type:'task',
            progress: 65,
            isDisabled: true,
            styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        }
      ]
    },
    ...
];
<Gantt tasks={tasks} />
```

You may handle actions

```javascript
<Gantt
  tasks={tasks}
  viewMode={view}
  onDateChange={onTaskChange}
  onTaskDelete={onTaskDelete}
  onProgressChange={onProgressChange}
  configureFromTaskChildren={true}
  onDoubleClick={onDblClick}
  onClick={onClick}
/>
```

## How to run example

```
cd ./example
npm install
npm start
```

## Gantt Configuration

### GanttProps

| Parameter Name                  | Type          | Description                                        |
| :------------------------------ | :------------ | :------------------------------------------------- |
| tasks\*                         | [Task](#Task) | Tasks array.                                       |
| [EventOption](#EventOption)     | interface     | Specifies gantt events.                            |
| [DisplayOption](#DisplayOption) | interface     | Specifies view type and display timeline language. |
| [StylingOption](#StylingOption) | interface     | Specifies chart and global tasks styles            |

### EventOption

| Parameter Name     | Type                                                                          | Description                                                                             |
| :----------------- | :---------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| onSelect           | (task: Task, isSelected: boolean) => void                                     | Specifies the function to be executed on the taskbar select or unselect event.          |
| onDoubleClick      | (task: Task) => void                                                          | Specifies the function to be executed on the taskbar onDoubleClick event.               |
| onClick            | (task: Task) => void                                                          | Specifies the function to be executed on the taskbar onClick event.                     |
| onDelete\*         | (task: Task) => void/boolean/Promise<void>/Promise<boolean>                   | Specifies the function to be executed on the taskbar on Delete button press event.      |
| onDateChange\*     | (task: Task, children: Task[]) => void/boolean/Promise<void>/Promise<boolean> | Specifies the function to be executed when drag taskbar event on timeline has finished. |
| onProgressChange\* | (task: Task, children: Task[]) => void/boolean/Promise<void>/Promise<boolean> | Specifies the function to be executed when drag taskbar progress event has finished.    |
| onExpanderClick\*  | onExpanderClick: (task: Task) => void;                                        | Specifies the function to be executed on the table expander click                       |
| timeStep           | number                                                                        | A time step value for onDateChange. Specify in milliseconds.                            |

\* Chart undoes operation if method return false or error. Parameter children returns one level deep records.

### DisplayOption

| Parameter Name            | Type    | Description                                                                                                                                         |
| :------------------------ | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| viewMode                  | enum    | Specifies the time scale. Hour, Quarter Day, Half Day, Day, Week(ISO-8601, 1st day is Monday), Month, QuarterYear, Year.                            |
| viewDate                  | date    | Specifies display date and time for display.                                                                                                        |
| preStepsCount             | number  | Specifies empty space before the fist task                                                                                                          |
| locale                    | string  | Specifies the month name language. Able formats: ISO 639-2, Java Locale.                                                                            |
| rtl                       | boolean | Sets rtl mode.                                                                                                                                      |
| configureFromTaskChildren | boolean | generate start date, end date and progress based on child tasks. if true, it will override progress, start and end date for all task with children  |

### StylingOption

All of this props must be put in `style props`

| Parameter Name             | Type   | Description                                                                                    |
| :------------------------- | :----- | :--------------------------------------------------------------------------------------------- |
| headerHeight               | number | Specifies the header height.                                                                   |
| ganttHeight                | number | Specifies the gantt chart height without header. Default is 0. It`s mean no height limitation. |
| columnWidth                | number | Specifies the time period width.                                                               |
| listCellWidth              | string | Specifies the task list cell width. Empty string is mean "no display".                         |
| rowHeight                  | number | Specifies the task row height.                                                                 |
| barCornerRadius            | number | Specifies the taskbar corner rounding.                                                         |
| barFill                    | number | Specifies the taskbar occupation. Sets in percent from 0 to 100.                               |
| handleWidth                | number | Specifies width the taskbar drag event control for start and end dates.                        |
| fontFamily                 | string | Specifies the application font.                                                                |
| fontSize                   | string | Specifies the application font size.                                                           |
| barProgressColor           | string | Specifies the taskbar progress fill color globally.                                            |
| barProgressSelectedColor   | string | Specifies the taskbar progress fill color globally on select.                                  |
| barBackgroundColor         | string | Specifies the taskbar background fill color globally.                                          |
| barBackgroundSelectedColor | string | Specifies the taskbar background fill color globally on select.                                |
| arrowColor                 | string | Specifies the relationship arrow fill color.                                                   |
| arrowIndent                | number | Specifies the relationship arrow right indent. Sets in px                                      |
| todayColor                 | string | Specifies the current period column fill color.                                                |


### Task

| Parameter Name | Type     | Description                                                                                           |
| :------------- | :------- | :---------------------------------------------------------------------------------------------------- |
| id\*           | string   | Task id.                                                                                              |
| name\*         | string   | Task display name.                                                                                    |
| type\*         | string   | Task display type: **task**, **milestone**, **project**                                               |
| start\*        | Date     | Task start date.                                                                                      |
| end\*          | Date     | Task end date.                                                                                        |
| progress\*     | number   | Task progress. Sets in percent from 0 to 100.                                                         |
| dependencies   | string[] | Specifies the parent dependencies ids.                                                                |
| styles         | object   | Specifies the taskbar styling settings locally. Object is passed with the following attributes:       |
|                |          | - **backgroundColor**: String. Specifies the taskbar background fill color locally.                   |
|                |          | - **backgroundSelectedColor**: String. Specifies the taskbar background fill color locally on select. |
|                |          | - **progressColor**: String. Specifies the taskbar progress fill color locally.                       |
|                |          | - **progressSelectedColor**: String. Specifies the taskbar progress fill color globally on select.    |
| isDisabled     | bool     | Disables all action for current task.                                                                 |
| fontSize       | string   | Specifies the taskbar font size locally.                                                              |
| tasks\*\*          | ITask    | All child tasks                                                                                       |

\*Required  
\*\* Represents the interface corresponding to a task

## License

MIT © [Hugoslr <hugo.schellinger@c-koya.tech>](https://github.com/Hugoslr <hugo.schellinger@c-koya.tech>)
