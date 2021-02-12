import AddPerson from "./components/AddPerson";
import View from "./components/View";
import { Container } from "@material-ui/core";
function App() {
  return (
    <>
      <Container>
        <View />
        <AddPerson />
      </Container>
    </>
  );
}

export default App;
