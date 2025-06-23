import { Outlet } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { getThemePallete } from "./ThemePallete";
import { Box } from "@mui/material";

function App() {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const [chat, setChat] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const theme = React.useMemo(() => createTheme(getThemePallete(mode)), [mode]);

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Root container with horizontal layout */}
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            background:
              "linear-gradient(rgba(215, 199, 244, 0.2), rgba(151, 133, 186, 0.2))",
          }}
        >
          {/* Sidebar (fixed on mobile) */}
          <Box
            sx={{
              width: { xs: "70%", md: "20%" },
              position: { xs: "fixed", md: "relative" },
              transform: {
                xs: menuOpen ? "translateX(0)" : "translateX(-100%)",
                md: "none",
              },
              transition: "transform 400ms ease",
              bgcolor: "primary.light",
              zIndex: { xs: 1200, md: 1 },
              boxShadow: { xs: menuOpen ? 10 : 0, md: 0 },
              height: "100vh",
              overflowY: "auto",
            }}
          >
            <Sidebar setChat={setChat} closeMenu={() => setMenuOpen(false)} />
          </Box>

          {/* Main content */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              ml: { xs: 0, md: 0 },
            }}
          >
            <Outlet
              context={{
                chat,
                setChat,
                handleMobileMenu: setMenuOpen,
              }}
            />
          </Box>
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
