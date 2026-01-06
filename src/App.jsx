import React, { useEffect, useState, useRef } from 'react';
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
import SubmittedSuccessfully from './components/form/SubmittedSuccessfully';
import ApproveSchool from './pages/ApproveSchool';
import AdminAuth from './pages/AdminAuth';
import ManageProducts from './pages/ManageProducts';
import AuthRoutes from './pages/AuthRoutes';
import SiteStatistics from './pages/SiteStatistics';
import ViewAllSchool from './pages/AdminViewAllSchool';
import UserManagement from './pages/UserManagement';
import { TbMessages } from "react-icons/tb";
import EditSchoolDetail from './pages/EditSchoolDetail';



function App() {

    const [alert, setAlert] = useState(null);
    const [auth, setAuth] = useState(undefined);
    const messageIconRef = useRef(null);
    const footerRef = useRef(null);
  

     function showAlert(message, type, from){
          console.log('show alert called outside useEffect', message, type, from)
           setAlert({
                 message: message,
                 type: type,
                 from: from,
                 id: new Date().getTime()
        })
         
        }

  useEffect(() => {
    if(localStorage.getItem('token')) {
getCurrentSchool().then((info) => {
      setAuth(info);
      console.log('school token', info)
    }).catch((err) => {
      setAuth(null);
       localStorage.removeItem('token');
    });
  } else {
    setAuth(null);
  }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current && messageIconRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (footerRect.top < windowHeight) {
          const visibleHeight = windowHeight - footerRect.top;
          messageIconRef.current.style.bottom = `${12 + visibleHeight}px`;
        } else {
          messageIconRef.current.style.bottom = '12px';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  console.log('auth state', auth);
  return (
    <BrowserRouter>
    <div className="bg-green-100 scroll-w-0 relative ">
        <main className="relative">
       {alert && <AlertPopup className="" setAlert={setAlert} message={alert.message} type={alert.type} from={alert.from} key={alert.id}/>}
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/developer" element={<Developers />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/yourSchool" element={<YourSchool showAlert={showAlert} auth={auth}/>} />
            <Route path="/schoolContribution" element={<SchoolContribution />} />
            <Route path="/uploadProducts" element={<AuthRoutes><ProductUploadForm showAlert={showAlert}/></AuthRoutes>}/>
            <Route path="/schoolLogin" element={<NoAuthRoutes children={<SchoolLoginForm showAlert={showAlert}/>}/>}/>
            <Route path="/schoolRegister" element={<NoAuthRoutes children={<SchoolRegisterForm showAlert={showAlert}/>}/>}/>
            <Route path="/schoolPage" element={<SchoolPage />}/>
            <Route path="/productEdit/:_id" element={<AuthRoutes><ProductEdit showAlert={showAlert}/></AuthRoutes>}/>
            <Route path="/product/:_id/helpedStudent" element={<AuthRoutes><HelpedStudentForm showAlert={showAlert}/></AuthRoutes>}/>
            <Route path="/submittedSuccessfully/:any" element={<SubmittedSuccessfully />}/>
            <Route path="/approveSchool" element={<AdminAuth><ApproveSchool showAlert={showAlert}/></AdminAuth>}/>
            <Route path="/admin/products" element={<AdminAuth><ManageProducts showAlert={showAlert} /></AdminAuth>} />
            <Route path="/statistics" element={<SiteStatistics />} />
            <Route path="/viewallschool" element={<ViewAllSchool />} />
            <Route path="/usermanagement" element={<UserManagement />} />
            <Route path="/EditSchoolDetail/:id" element={<AuthRoutes><EditSchoolDetail setAlert={setAlert}/></AuthRoutes>}/>
          </Routes>
        <div ref={messageIconRef} className="text-green-900 fixed right-3 text-6xl" style={{ bottom: '12px' }}>
          <a href="/contact"><TbMessages /></a>
        </div>
        </main>
    </div>
        
        <div ref={footerRef}>
          <Footer />
        </div>
    </BrowserRouter>
  );
};

export default App;
