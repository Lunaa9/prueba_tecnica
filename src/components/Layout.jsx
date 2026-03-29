import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";

const Layout = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800); 
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <LoadingOverlay />}
      {children}
    </>
  );
};

export default Layout;
