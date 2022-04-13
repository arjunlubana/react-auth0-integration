import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Content from "./views/Content";
import Profile from "./views/Profile";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes path="/">
        <Route index element={<Content />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
