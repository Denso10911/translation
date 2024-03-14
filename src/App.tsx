import './App.css'
import 'regenerator-runtime/runtime'
import Dictaphone from "./components/Dictaphone";
import {DarkMode} from "@chakra-ui/react";

function App() {
  
  return (
    <DarkMode>
      <Dictaphone />      
    </DarkMode>
  )
}

export default App
