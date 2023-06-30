import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { DetailsItem } from "../pages/Details";
import { AddItem } from "../pages/admin/AddItem";
import { useAuth } from "../hooks/auth";
import { EditItem } from "../pages/admin/EditItem";

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<DetailsItem />} />

      {/* Exclusive admin pages */}
      {user && user.isAdmin ? (
        <>
          <Route path="/add" element={<AddItem />} />
          <Route path="/edit/:id" element={<EditItem />} />
        </>
      ) : null}
    </Routes>
  );
}
