import { useParams } from "react-router-dom";

export default function Laboratorio() {
  const { id } = useParams();

  return <div>Laboratorio {id}</div>;
}
