import React, {createContext, useContext, useEffect, useReducer} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import Firestore

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
    const subscriber = auth().onAuthStateChanged(async user => {
      if (user) {
        try {
          // Fetch user role from Firestore
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();

          if (userDoc.exists) {
            const userData = userDoc.data();
            const userWithRole = {
              ...user,
              role: userData.role,
            };
            dispatch({type: 'LOGIN', payload: {user: userWithRole}});
            console.log('User account created & signed in!', userWithRole);
          } else {
            console.error('User document not found');
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
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
