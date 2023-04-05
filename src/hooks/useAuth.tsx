import React, { useState, useContext, createContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CURRENT_USER, LOGIN_MUTATION } from "../commons/apollo/user";
import Cookie from "js-cookie";
import { useAlert } from "react-alert";

const AuthContext = createContext(null);

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [login] = useMutation(LOGIN_MUTATION);
  const alert = useAlert();

  const signIn = async (username: string, password: string) => {

    const response = await login({
      variables: {
        username: username,
        password: password
      },onError(error, clientOptions?) {
        alert.error("Credenciales incorrectas");
      },
    });

    if (response.errors) {
      throw response.errors[0].message;
    }
    
    Cookie.set("token", response?.data?.login?.token, { expires: 1 });
    Cookie.set("user",response?.data?.login?.id, { expires: 1 });
    setUser(response);
    return response;
  };
  
  const getCurrentUser = async () => {
    const id=Cookie.get("user");
    const { data: query } = useQuery(CURRENT_USER, {
      variables: { id:id}
    });
    return query?.getUser;
  }

  return {
    user,
    getCurrentUser,
    signIn
  };
}
