import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Content from "./views/Content";
import ProfileOverview from "./views/ProfileOverview";
import ProfileSettings from "./views/ProfileSettings";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes path="/">
        <Route index element={<Content />} />
        <Route path="profile" element={<ProfileOverview />}>
          <Route path="personal" element={<ProfileSettings />} />
        </Route>
      </Routes>
    </div>
  );
}
