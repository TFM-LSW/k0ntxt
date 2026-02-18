import './App.css';

import { ThemeProvider } from "next-themes"
import { ThemedChakraProvider } from './ThemedChakraProvider';
import AppRouter from './Router';

const App = () => {
  return (
    <ThemeProvider enableSystem attribute="class">
      <ThemedChakraProvider>
        <AppRouter />
      </ThemedChakraProvider>
    </ThemeProvider>
  );
};

export default App;