import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Navbar } from "components";
import { Content } from "views";
import { SnackbarProvider } from "context/SnackbarContext";
import { UserProvider } from "context/UserContext";
import { ThemeProvider } from "context/ThemeContext";

const Profile = lazy(() => import("views/Profile"));

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <SnackbarProvider>
          <CssBaseline />
          <Navbar />
          <Suspense fallback={<div>...loading</div>}>
            <Routes path="/">
              <Route index element={<Content />} />
              <Route path="profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </SnackbarProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
