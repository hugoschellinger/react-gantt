import React, { useState } from "react";
import "./App.css";
import Gantt from "./components/gantt/gantt";
import { ViewMode } from "./types/public-types";

function App() {
  const [hiddenProjects, setHiddenProjects] = useState(["15"]);
  return (
    <>
      <Gantt
        viewMode={ViewMode.Week}
        locale="fr-FR"
        onDateChange={() => {}}
        onExpanderClick={(i) => {
          if (hiddenProjects.includes(i.id)) {
            setHiddenProjects(hiddenProjects.filter((h) => h !== i.id));
          } else {
            setHiddenProjects(hiddenProjects.concat(i.id));
          }
        }}
        tasks={[
          {
            id: "15",
            type: "project",
            name: "Chantier 1",
            progress: 0,
            start: new Date(),
            end: new Date(),
            displayOrder: 1,
            hideChildren: hiddenProjects.includes("15"),
            tasks: [
              {
                id: "1",
                type: "task",
                name: "Étape 1",
                progress: 55,
                start: new Date("2022-12-08"),
                end: new Date("2022-12-27"),
              },
              {
                id: "2",
                type: "task",
                name: "Étape 2",
                progress: 0,
                start: new Date("2022-12-29"),
                end: new Date("2023-02-05"),
              },
              {
                id: "3",
                type: "milestone",
                name: "Livraison",
                progress: 0,
                start: new Date("2023-03-06"),
                end: new Date("2023-03-06"),
                isDisabled: true,
              },
            ],
          },
          {
            id: "Chantier 2",
            type: "project",
            name: "Chantier 2",
            progress: 0,
            start: new Date(),
            end: new Date(),
            hideChildren: hiddenProjects.includes("Chantier 2"),
          },
          {
            id: "Chantier 3",
            type: "project",
            name: "Chantier 3",
            progress: 0,
            start: new Date(),
            end: new Date(),
            hideChildren: hiddenProjects.includes("Chantier 3"),
          },
        ]}
      />
    </>
  );
}

export default App;
