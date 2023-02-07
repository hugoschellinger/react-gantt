import {useEffect, useState} from "react";
import { GanttAppProps, ITask, ViewMode } from "../../types/public-types";
import { GanttApp } from "./ganttApp";
import {Task} from "../../types/public-types"

interface GanttApp extends Omit<GanttAppProps,"tasks">{
    tasks:ITask[];
}


export default function Gantt(props:GanttApp):JSX.Element{

    const [tasks, setTasks] = useState<Task[]>([]);

    function castTasks():ITask[]{
        let tasksArray:ITask[]=[];

        props.tasks.forEach((parentTask)=>{
            tasksArray.push(parentTask as Task);
            if(parentTask.tasks!==undefined){
                parentTask.tasks.map((task,index) => flatTaskChildren(task,index,parentTask,tasksArray))
            }
        })

        setTasks(tasksArray as Task[]);
        return tasksArray;
    }

    function flatTaskChildren(task:ITask,index:number,parentTask:ITask, tasksArray:Task[]):void{
        tasksArray.push(({...task,project:parentTask.id,dependencies:[index.toString()]} as Task));
        if(task.tasks !==undefined){
            task.tasks.map((t,i)=>{
                flatTaskChildren(t,i,task,tasksArray);
            })
        }
    }

    useEffect(() => {
        setTasks(castTasks());
    }, [props.tasks]);

    return (
        <GanttApp {...props} tasks={tasks}/>
    )
  }