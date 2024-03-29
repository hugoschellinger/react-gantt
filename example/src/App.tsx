import React,{ useState } from "react";
import { Gantt, ITask, ViewMode } from "../../dist";
import "./App.css";

function App() {
  // const [tasks, setTasks] = useState<ITask[]>([
  //   {
  //     id: "15",
  //     type: "project",
  //     name: "Chantier 1",
  //     progress: 100,
  //     start: new Date(),
  //     end: new Date(),
  //     displayOrder: 1,
  //     tasks: [
  //       {
  //         id: "16",
  //         type: "project",
  //         name: "Étape 1",
  //         progress: 100,
  //         start: new Date("2022-12-08"),
  //         end: new Date("2022-12-27"),
  //         tasks: [
  //           {
  //             id: "2",
  //             type: "task",
  //             name: "Étape 2",
  //             progress: 50,
  //             start: new Date("2022-11-30"),
  //             end: new Date("2023-02-05"),
  //           },
  //           {
  //             id: "3",
  //             type: "milestone",
  //             name: "Livraison",
  //             progress: 50,
  //             start: new Date("2023-03-06"),
  //             end: new Date("2023-03-06"),
  //             isDisabled: true,
  //           },
  //           {
  //             id: "4",
  //             type: "milestone",
  //             name: "Livraison 2",
  //             progress: 50,
  //             start: new Date("2023-04-06"),
  //             end: new Date("2023-04-06"),
  //             isDisabled: true,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: "Chantier 2",
  //     type: "project",
  //     name: "Chantier 2",
  //     progress: 0,
  //     start: new Date(),
  //     end: new Date(),
  //   },
  //   {
  //     id: "Chantier 3",
  //     type: "project",
  //     name: "Chantier 3",
  //     progress: 0,
  //     start: new Date(),
  //     end: new Date(),
  //   },
  // ]);

  const [tasks, setTasks] = useState<ITask[]>([
    {
      id: "15",
      type: "task",
      name: "Chantier 1",
      progress: 100,
      start: new Date("2023-03-06"),
      end: new Date("2023-04-06"),
      displayOrder: 1,
    },
    {
      id: "16",
      type: "task",
      name: "ouistiti",
      progress: 100,
      start: new Date("2023-03-06"),
      end: new Date("2023-04-06"),
      displayOrder: 1,
    }
  ]);

  return (
      <Gantt
        viewMode={ViewMode.Week}
        locale="fr-FR"
        tasks={tasks}
      />
  );
}

export default App;
