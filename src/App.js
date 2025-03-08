import { Header } from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Rat } from "./components/Rat/Rat";

import { Main } from "./pages/Main/Main";
import { Orders } from "./pages/Orders/Orders";
import { Spools } from "./pages/Spools/Spools";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Rat /> */}
        <Header />
        <div className="page">
          <Routes>
            <Route path="/spools" element={<Spools />} />
            <Route path="/" element={<Main />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
