import { useEffect, useState, useCallback, useMemo } from "react";
import { GanttAppProps, ITask } from "../../types/public-types";
import { GanttApp } from "./ganttApp";
import { Task } from "../../types/public-types";

interface GanttProps extends Omit<GanttAppProps, "tasks" | "onExpanderClick"> {
  tasks: ITaskProps[];
  configureFromTaskChildren?: boolean;
}

export interface ITaskProps extends Omit<ITask, "hideChildren"> {}

export default function Gantt(props: GanttProps): JSX.Element {
  const [isMounted, setIsMounted] = useState(false);
  const [hiddenProjectId, setHiddenProjectId] = useState<string[]>([]);

  useEffect(() => {
    setIsMounted(false);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, [props]);

  const onExpanderClick = useCallback(
    (i: ITask) => {
      if (hiddenProjectId.includes(i.id)) {
        setHiddenProjectId(hiddenProjectId.filter((h) => h !== i.id));
      } else {
        setHiddenProjectId(hiddenProjectId.concat(i.id));
      }
    },
    [hiddenProjectId]
  );

  function castITasksToTasks(): ITask[] {
    let tasksArray: ITask[] = [];

    props.tasks.forEach((parentTask) => {

      if (parentTask.tasks !== undefined && parentTask.tasks.length) {
        if (props.configureFromTaskChildren) {
          parentTask = configureFromChildren(parentTask);
        }
        parentTask.tasks!.map((task, index) =>
        flatTaskChildren(task, index, parentTask, tasksArray)
        );
      }
      tasksArray.push(verifyTypeTask(parentTask) as Task);
    });

    return tasksArray;
  }

  function configureFromChildren(task: ITask): ITask {
    let bestStartDate: Date | null = null;
    let bestEndDate: Date | null = null;
    let averageProgress = 0;

    if(task.tasks!==undefined && task.tasks.length){
      task.tasks!.forEach((t) => {
        if (t.tasks !== undefined && t.tasks.length) t = configureFromChildren(t);
        if (
          bestStartDate == null ||
          bestStartDate > t.start
        ) {
          bestStartDate = t.start;
        }
        if (bestEndDate == null || bestEndDate < t.end) {
          bestEndDate = t.end;
        }
        if(t.type!=="milestone"){
          averageProgress += t.progress;
        }
      });
    }else{
      bestStartDate = task.start;
      bestEndDate = task.end;
      averageProgress = task.progress ?? 0;
  }

    return {
      ...task,
      start: bestStartDate!,
      end: bestEndDate!,
      progress: parseInt((averageProgress / task.tasks!.filter(t => t.type!=="milestone").length).toFixed(0)),
    };
  }

  function flatTaskChildren(
    task: ITask,
    index: number,
    parentTask: ITask,
    tasksArray: Task[]
  ): void {
    if (props.configureFromTaskChildren && (task.tasks !== undefined && task.tasks.length)) {
      task = configureFromChildren(task);
    }
    tasksArray.push({
      ...verifyTypeTask(task),
      project: parentTask.id,
      dependencies: task.dependencies ?? [(index+1).toString()],
    } as Task);
    if (task.tasks !== undefined && task.tasks.length) {
      task.tasks!.forEach((t, i) => {
        flatTaskChildren(t, i, task, tasksArray);
      });
    }
  }

  function verifyTypeTask(task: ITask): ITask {
    if (task.tasks !== undefined && task.tasks.length) {
      if (task.type !== "project") {
        console.error(
          `La tâche ${task.id} ne peut que être de type 'project' car il possède des tasks enfants`
        );
        task.type = "project";
      }
      task.hideChildren = !hiddenProjectId.includes(task.id);
    }

    return task;
  }

  const gantt = useCallback(
    () => (
      <GanttApp
        {...props}
        tasks={castITasksToTasks()}
        onExpanderClick={onExpanderClick}
        onDateChange={()=>{}}
      />
    ),
    [onExpanderClick]
  );


  if (!isMounted) return <></>;

  return (
    <>
      <p>ouistiti</p>
      {gantt()}
    </>
  );
}
