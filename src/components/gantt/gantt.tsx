import { useEffect, useState, useCallback } from "react";
import { GanttAppProps, ITask } from "../../types/public-types";
import { GanttApp } from "./ganttApp";
import { Task, StylingOption, EventOption, DisplayOption } from "../../types/public-types";

interface GanttProps extends Omit<EventOption,"onExpanderClick">,DisplayOption {
  tasks: ITaskProps[];
  configureFromTaskChildren?: boolean;
  style?:StylingOption;
}

export interface ITaskProps extends Omit<ITask, "hideChildren"> {}

export default function Gantt(props: GanttProps): JSX.Element {

  /**
   * True quand les tacks sont bien configuré
   */
  const [isMounted, setIsMounted] = useState(false);
  /**
   * Liste des id de tous les projets qui ont les task enfant caché
   */
  const [hiddenProjectId, setHiddenProjectId] = useState<string[]>([]);

  useEffect(() => {
    setIsMounted(false);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, [props]);

  /**
   * @param {ITask} i Task sur laquelle on veut ouvrir ou fermer les tasks enfant
   */
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

  /**
   * Transforme les tasks recu en props en tasks lisible par la librairie
   * @returns {ITask[]}
   */
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

  /**
   * Appelé lorsque la props configureFromTaskChildren est true, elle change la date de départ,de fin et la progression selon les tasks enfant
   * @param {ITask} task Task parent que l'on doit configurer
   * @returns {ITask} Retourne la task parent modifié
   */
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

  /**
   * Transforme des task enfants pour qu'elle soit lisible par la librairie
   * @param {ITask} task Task à ajouter
   * @param {number} index Index de la task dans la liste d'enfant de son parent
   * @param {ITask} parentTask Task parent de la task à ajouter 
   * @param {Task[]} tasksArray Retourne la liste des tasks que la librairie va lire pour afficher le gantt
   */
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

  /**
   * 
   * @param {ITask} task Task a vérifier
   * @returns {ITask} Retourne la task vérifié et modifié si il le fallait 
   */
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

  /**
   * Affichage de du gantt
   */
  const gantt = useCallback(
    () => (
      <GanttApp
        {...props}
        {...props.style}
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
      {gantt()}
    </>
  );
}
