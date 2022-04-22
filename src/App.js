import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Navbar } from "components";
import { Content, Profile } from "views";
import { SnackbarProvider } from "context/SnackbarContext";
import { UserProvider } from "context/UserContext";
import { ThemeProvider } from "context/ThemeContext";

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <SnackbarProvider>
          <CssBaseline />
          <Navbar />
          <Routes path="/">
            <Route index element={<Content />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </SnackbarProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
