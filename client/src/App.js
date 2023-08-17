import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";



function App() {
  // grab the current state with useSelector.
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* using react router to make our paths with corresponding component. */}
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />}></Route>
            {/* this path uses react router useParams(). :userId will be access later on using that custom hook from react router dom */}
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />}></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
