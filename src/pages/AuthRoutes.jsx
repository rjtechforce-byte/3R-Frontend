import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "../components/form/MiniComp";
import { getCurrentSchool } from '../components/form/api';

function AuthRoutes({ children }) {
    const [auth, setAuth] = useState(undefined);
    const [loading, setLoading] = useState(true);
    
          useEffect(() => {
        getCurrentSchool().then((info) => {
              setAuth(info);
              console.log('school token', info)
              setLoading(false);
            }).catch((err) => {
              setAuth(null);
               localStorage.removeItem('token');
                  setLoading(false);
            });
          }, []);
    
         if(loading) {
            return <Loading message="Authenticating..." />;
        }
    
    if(!auth){
        return <Navigate to="/schoolLogin" />;
    }
return children;
};

export default AuthRoutes;