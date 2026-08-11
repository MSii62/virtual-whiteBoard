import Board from "./components/Board";
import Toolbar from "./components/Toolbar";
import Toolbox from "./components/toolbox";
import BoardProvider from "./Store/BoardProvider";
import ToolboxProvider from "./Store/ToolboxProvider";

function App() {
  return (
    <BoardProvider>
      <ToolboxProvider>
        <Toolbar />
        <Board />
        <Toolbox />
      </ToolboxProvider>
    </BoardProvider>
  );
}

export default App;