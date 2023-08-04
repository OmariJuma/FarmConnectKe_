import React, {createContext, useState} from 'react';

export const AuthenticatedUserContext = createContext({});
export const AuthenticatedUserProvider = ({children}) => {
  const [user, setUser] = useState({
    userId:null,
    firstName:null,
    secondName:null,
    email:null,
    phoneNo:null,
    photoUrl:null
  });
  const [articles, setArticles] = useState([]);
  const [insertedImg, setInsertedImg] = useState({
    image:"",
    mimeType:""
  });
  return (
    <AuthenticatedUserContext.Provider
      value={{user, setUser, articles, setArticles, insertedImg,setInsertedImg}}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
