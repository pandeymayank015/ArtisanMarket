import {
  BrowserRouter as Router,
  Routes,
  Route
}from "react-router-dom";
import Artisans from "./Artisans";
import ArtisanProfile from "./ArtisanProfile";
import UploadForm from "./UploadForm";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element = {<Artisans/>} />
        <Route path="/artisan/:id" element = {<ArtisanProfile/>} /> 
        <Route path="/upload" element = {<UploadForm/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
