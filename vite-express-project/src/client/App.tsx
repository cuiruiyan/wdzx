
import "./App.css";


import { useState } from "react";

import reactLogo from "./assets/react.svg";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const usercode = async () => {
    try {
      const response = await axios.get('/usercode');
      console.log(response.data);
      window.open(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div>
      <button id="usercode" onClick={usercode} >用户授权</button>
    </div>
  );
}

export default App;