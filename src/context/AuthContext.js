import React, {createContext, useContext, useEffect, useReducer} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();
const initialState = {isAuthenticated: false, user: {uid: ''}};
const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        user: {uid: ''}, // Clear user data on logout
      };
    default:
      return state;
  }
};

export default function AuthContextProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Handle user state changes
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        dispatch({type: 'LOGIN', payload: {user}});
      } else {
        dispatch({type: 'LOGOUT'}); // Logout when user is null
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
