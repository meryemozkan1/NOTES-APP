import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../../types";

const Layout = ({ notes }: { notes: Note[] }) => {
  //Url deki ıd yi al
  const { id } = useParams();
  //Notes dizisinde elemanı ara
  const found = notes.find((i) => i.id === id);
  //Blmazsa anasayfaya yönlendir.
  if (!found) return <Navigate to="/" replace />;

  //Parent route içersinde alt route'u nasıl renderla
  return <Outlet context={found} />;
};

export default Layout;
