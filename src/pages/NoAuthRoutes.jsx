import React from "react";
import { Navigate } from "react-router-dom";

function NoAuthRoutes({ auth, children }) {
    if(auth){
        return <Navigate to="/" />;
    }
return children;
};

export default NoAuthRoutes;