import React,{ createContext,useState } from "react";


export const  AuthenticatedUserContext =createContext({});
export const AuthenticatedUserProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);
  return (
    <AuthenticatedUserContext.Provider value={{user, setUser, articles, setArticles}}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
