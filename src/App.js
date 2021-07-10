import AuthProvider from "./Context/AuthProvider";
import Signup from "./Components/Signup";
function App() {
  return (
    <>
      {/* enclosing signup inside auth provider to give it context value */}
      <AuthProvider>
        <Signup />
      </AuthProvider>
    </>
  );
}

export default App;
