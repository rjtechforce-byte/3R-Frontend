import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function NoAuthRoutes({ auth, children }) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    if (auth === undefined) {
      setLoading(true);
      return;
    }

    if (!auth) {
        setLoading(false);
        return;
    }
}, []);
    if(auth){
        return <Navigate to="/" />;
    }
return children;
};

export default NoAuthRoutes;