import { Routes, Route } from "react-router-dom";
import { Navbar } from "components";
import { Content, Profile } from "views";

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