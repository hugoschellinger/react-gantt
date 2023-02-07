import {useEffect, useState} from "react";
import { GanttAppProps, ITask } from "../../types/public-types";
import { GanttApp } from "./ganttApp";
import {Task} from "../../types/public-types"

interface GanttProps extends Omit<GanttAppProps,"tasks">{
    tasks:ITask[];
}


export default function Gantt(props:GanttProps):JSX.Element{
    
    const [tasks, setTasks] = useState<Task[]>([]);
    
    useEffect(() => {
        setTasks(castTasks());
    }, [props]);

    function castTasks():ITask[]{
        let tasksArray:ITask[]=[];

        console.log(props.tasks);
        
        props.tasks.forEach((parentTask)=>{
            tasksArray.push(parentTask as Task);
            if(parentTask.tasks!==undefined){
                parentTask.tasks.map((task,index) => flatTaskChildren(task,index,parentTask,tasksArray))
            }
        })

        return tasksArray;
    }

    function flatTaskChildren(task:ITask,index:number,parentTask:ITask, tasksArray:Task[]):void{
        tasksArray.push(({...task,project:parentTask.id,dependencies:[index.toString()]} as Task));
        if(task.tasks !==undefined){
            task.tasks.forEach((t,i)=>{
                flatTaskChildren(t,i,task,tasksArray);
            })
        }
    }

    return (
        <>
        <p>ouistiti</p>
        <GanttApp {...props} tasks={tasks}/>
        </>
    )
  }