import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Slidebar from "./components/Slidebar";
import Developers from "./pages/Developers";
import Inspiration from "./pages/Inspiration";
import Initiatives from "./pages/Initiatives";
import Contact from "./pages/Contect";
import Footer from "./components/Footer";
import YourSchool from "./pages/YourSchool";
import SchoolContribution from "./pages/SchoolContribution";
import ProductUploadForm from "./components/form/ProductUploadForm";
import SchoolLoginForm from "./components/form/SchoolLoginForm";
import SchoolRegisterForm from "./components/form/SchoolRegisterForm";
import { AlertPopup } from "./components/form/MiniComp";
import SchoolPage from './components/SchoolPage';
import Welcome from './pages/Welcome';
import ProductEdit from './components/form/ProductEdit';
import { getCurrentSchool } from './components/form/api';
import NoAuthRoutes from './pages/NoAuthRoutes';
import HelpedStudentForm from './components/form/HelpedStudentForm';


function App() {

    const [alert, setAlert] = useState(null);
    const [auth, setAuth] = useState(undefined);


    function showAlert(message, type, from){
        setAlert({
             message: message,
             type: type,
             from: from
    })
        setTimeout(() => {
            setAlert(null);
        }, 4000);
    }

  useEffect(() => {
getCurrentSchool().then((school) => {
      setAuth(school);
    }).catch((err) => {
      setAuth(null);
    });
  }, []);
    
  return (
    <BrowserRouter>
    <div className="bg-green-100 scroll-w-0 relative ">
        <main className="relative">
       {alert && <AlertPopup className="" message={alert.message} type={alert.type} from={alert.from}/>}
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/developer" element={<Developers />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/yourSchool" element={<YourSchool showAlert={showAlert} auth={auth}/>} />
            <Route path="/schoolContribution" element={<SchoolContribution />} />
            <Route path="/uploadProducts" element={<ProductUploadForm showAlert={showAlert}/>}/>
            <Route path="/schoolLogin" element={<NoAuthRoutes auth={auth} children={<SchoolLoginForm showAlert={showAlert}/>}/>}/>
            <Route path="/schoolRegister" element={<SchoolRegisterForm showAlert={showAlert}/>}/>
            <Route path="/schoolPage" element={<SchoolPage />}/>
            <Route path="/productEdit/:_id" element={<ProductEdit showAlert={showAlert}/>}/>
            <Route path="/product/:_id/helpedStudent" element={<HelpedStudentForm showAlert={showAlert}/>}/>
          </Routes>
        </main>
    </div>
        
        <Footer />
    </BrowserRouter>
  );
};

export default App;
