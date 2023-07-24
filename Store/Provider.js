import React, {createContext, useState} from 'react';

export const AuthenticatedUserContext = createContext({
  userId: '',
  firstName: '',
  secondName: '',
  email: '',
  phoneNo: '',
  photoUrl: '',
});
export const AuthenticatedUserProvider = ({children}) => {
  const [user, setUser] = useState({
    userId:"",
    firstName:"",
    secondName:"",
    email:"",
    phoneNo:"",
    photoUrl:""
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
