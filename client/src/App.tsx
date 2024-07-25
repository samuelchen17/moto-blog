import "./App.css";

// naming convention adding an "I" in front, for "interface"
export interface IAppProps {}

// define functional component using typescript
// specifying the type of props component expects

// React.FunctionComponent (or React.FC for short) is a type provided by React for defining functional components.
// <IAppProps> is a generic type parameter specifying the type of props the component expects. This means Application expects props of type IAppProps.
const App: React.FunctionComponent<IAppProps> = (props) => {
  return <></>;
};

export default App;
