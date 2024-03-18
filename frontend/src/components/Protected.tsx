import {useEffect} from 'react';
import {useUser} from "../context/userContext/userContextImport.ts";
import {Outlet, useNavigate} from "react-router-dom";

const Protected = () => {
  const {user} = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/home");
    }
  }, [user]);

  return <Outlet/>;
};

export default Protected;