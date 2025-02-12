"use client";
import Button from "@/components/button";
import { FormEvent, useState } from "react";
import { CreateTask } from "@/api/proyectos";

const TaskForm = (props: any) => {
  const { project_id, employees } = props;

  const [taskData, setTaskData] = useState({
    name: "",
    state: "no iniciada",
    description: "",
    project_id: project_id,
    priority: "",
    responsible_id: "",
  });

  const handleChange = (props: any) => {
    const { name, value } = props.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await CreateTask(taskData);
      window.location.href = "/projects/" + project_id + "/tasks";
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
    // Aquí puedes manejar la lógica para enviar los datos del proyecto
    console.log("Datos de la tarea:", taskData);
  };
  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold decoration-gray-400">
            Nueva tarea
          </h1>
        </div>
      </div>
      <form className="project-form bg-gray-100" onSubmit={handleSubmit}>
        <label>
          Nombre de la tarea:
          <input
            type="text"
            name="name"
            value={taskData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Responsable de la tarea:
          <select
            name="responsible_id"
            value={taskData.responsible_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleccionar líder
            </option>
            {employees.map((employee: any) => (
              <option key={employee.legajo} value={employee.legajo}>
                {employee.name} {employee.last_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Prioridad de la tarea:
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleccionar prioridad
            </option>
            <option value={"alta"}>Alta</option>
            <option value={"media"}>Media</option>
            <option value={"baja"}>Baja</option>
          </select>
        </label>

        <label>
          Descripción de la tarea:
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
          />
        </label>

        <div className="flex justify-between">
          <Button href={"/projects/" + taskData.project_id + "/tasks"}>
            {" "}
            {/*IMPORTANTE: NO PASAR CHILDREN COMO PROP*/}
            Volver
          </Button>
          <button type="submit">Crear tarea</button>
        </div>
        <style jsx>{`
          .project-form {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          label {
            display: block;
            margin-bottom: 10px;
          }

          input,
          select,
          textarea {
            width: 100%;
            padding: 8px;
            margin-top: 4px;
            margin-bottom: 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
          }

          button {
            background-color: #384454;
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          button:hover {
            background-color: #273343;
          }
        `}</style>
      </form>
    </>
  );
};

export default TaskForm;
