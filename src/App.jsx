import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import VenueDetails from "./pages/VenueDetails";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import AddVenue from "./pages/AddVenue";
import EditVenue from "./pages/EditVenue";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/venue/:venueId" element={<VenueDetails />} />
          <Route path="/venue/:id/edit" element={<EditVenue />} />
          <Route path="/venue/add" element={<AddVenue />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}
