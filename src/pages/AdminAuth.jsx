import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentSchool } from '../components/form/api';
import { Loading } from '../components/form/MiniComp';

function AdminAuth({children}) {
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
        return <Loading message="Verifying Admin Access..." />;
    }

    if(auth?.role !== 'admin') {
        return <Navigate to="/" />;
    }
    return children;
};

export default AdminAuth;