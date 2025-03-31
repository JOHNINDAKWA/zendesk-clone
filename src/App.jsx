import { MacroProvider } from "./components/Context/MacroContext";
import TicketPage from "./Pages/TicketPage/TicketPage";

function App() {
  return (
    <>
      <MacroProvider>
        <TicketPage />
      </MacroProvider>
    </>
  );
}

export default App;
