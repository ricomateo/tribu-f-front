import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Página no encotrada</h2>
      <Link href="/">Volver al inicio</Link>
    </div>
  );
};

export default NotFound;
