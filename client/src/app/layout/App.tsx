import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import { useAppSelector } from "../store/Store";

function App() {
  const { darkMode } = useAppSelector((state) => state.ui);
  const modeType = darkMode ? "dark" : "light";
  const font1 = {fontFamily: ["Winsideuz", "sans-serif"].join(","), color: "#BDBDBD"};
  const font2 = {fontFamily: ["Ropa Sans", "sans-serif"].join(","), color: "#BDBDBD"};

  const darkTheme = createTheme({
    palette: {
      mode: modeType,
    },
    typography: {
      h1: font1,
      h2: font1,
      h3: font1,
      h4: font1,
      h5: font1,
      h6: font1,
      subtitle1: font2,
      body2: font2
    }
     });


  return (
    <>
      <ThemeProvider theme={darkTheme} >
        <Nav />
        <CssBaseline />
        <Container maxWidth="xl" sx={{ mt: 14 }}>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
