import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Content from "./views/Content";
import Profile from "./views/Profile";
import ProfileOverview from "./views/ProfileOverview";
import ProfileSettings from "./views/ProfileSettings";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes path="/">
        <Route index element={<Content />} />
        <Route path="profile" element={<Profile />}>
          <Route path="overview" element={<ProfileOverview />} />
          <Route path="personal" element={<ProfileSettings />} />
        </Route>
      </Routes>
    </div>
  );
}
