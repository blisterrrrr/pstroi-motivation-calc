import { LoginForm } from "@/components/PStroiCalc.tsx";
import { ThemeProvider } from "@/components/theming/ThemeProvider.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme={"dark"} storageKey={"theme"}>
      <LoginForm />
    </ThemeProvider>
  );
}

export default App;
