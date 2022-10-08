import { Routes, Route, Link } from "react-router-dom";

import Home from "./layouts/Home";
import MisMatriculas from "./layouts/MisMatriculas";
import Laboratorio from "./layouts/Laboratorio";
import NuevaMatricula from "./layouts/NuevaMatricula";

export default function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/nueva-matricula">Nueva Matricula</Link>
          </li>
          <li>
            <Link to="/mis-matriculas">Mis Matriculas</Link>
          </li>
          <li>
            <Link to="/laboratorio/gfdgd">Laboratorio</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/nueva-matricula" element={<NuevaMatricula />} />
        <Route path="/mis-matriculas" element={<MisMatriculas />} />
        <Route path="/laboratorio/:id" element={<Laboratorio />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
