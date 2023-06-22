import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export const RootLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
