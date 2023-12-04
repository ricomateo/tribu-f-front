"use client";
import { EditProject } from "@/api/proyectos";
import Button from "@/components/button";
import React, { FormEvent, useState } from "react";


const EditProjectForm = (props: any) => {
  const { project, employees } = props;
  const [projectData, setProjectData] = useState({
    id: project.id,
    name: project.name,
    project_leader_id: project.project_leader_id,
    description: project.description,
    expected_duration_days: project.expected_duration_days,
    state: project.state,
  });

  const handleChange = (props: any) => {
    const { name, value } = props.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("editProject data: ", projectData);
      const data = await EditProject(projectData);
      console.log("editProject data: ", data);
      window.location.href = "/projects/" + project.id;
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
    }
    console.log("Datos del proyecto:", projectData);
  };

  return (
    <>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold decoration-gray-400">
            Editar proyecto
          </h1>
        </div>
      </div>
      <form className="project-form bg-gray-100" onSubmit={handleSubmit}>
        <label>
          Nombre del proyecto:
          <input
            type="text"
            name="name"
            defaultValue={project.name}
            value={projectData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Líder del proyecto:
          <select
            name="project_leader_id"
            defaultValue={projectData.project_leader_id}
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
          Estado del proyecto:
          <select
            name="state"
            defaultValue={projectData.state}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleccionar estado
            </option>
            <option value="no iniciado">No iniciado</option>
            <option value="en proceso">En proceso</option>
            <option value="bloqueado">Bloqueado</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </label>

        <label>
          Descripción del proyecto:
          <textarea
            name="description"
            defaultValue={projectData.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Duración estimada del proyecto:
          <input
            type="number"
            name="expected_duration_days"
            defaultValue={project.expected_duration_days}
            onChange={handleChange}
            required
          />
        </label>

        <div className="flex justify-between">
          <Button href={`/projects/${project.id}`}>
            {" "}
            {/*IMPORTANTE: NO PASAR CHILDREN COMO PROP*/}
            Volver
          </Button>
          <button type="submit">Guardar cambios</button>
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

export default EditProjectForm;
