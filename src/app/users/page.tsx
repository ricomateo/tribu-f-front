import { GetUsuarios } from "@/api/proyectos";
import Table from "@/components/Table/Table";
import Title from "@/components/Title";

export default async function Users() {
  const data = await GetUsuarios();
  return (
    <>
      <Title title="Usuarios" />
      <Table data={data} />
    </>
  );
}
