import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Profile from "./components/Profile";

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
