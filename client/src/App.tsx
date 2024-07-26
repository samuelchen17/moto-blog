import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/routes";

// naming convention adding an "I" in front, for "interface"
export interface IAppProps {}

const App = (props: IAppProps) => {
  return <RouterProvider router={router} />;
};

export default App;
