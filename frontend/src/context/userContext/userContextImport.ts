import {ApiResObj} from "../../providers/userProvider.ts";
import {createContext, useContext} from "react";
import {User, UserNamePassword} from "./UserProvider.tsx";

interface UserContextType {
  user: User | undefined | null;
  login: (creds: UserNamePassword) => Promise<ApiResObj>;
  logout: ()=> void;
}

export const UserContext = createContext<UserContextType>({
  user: undefined,
  login: () : Promise<ApiResObj> => new Promise(()=>{}),
  logout: () => {
  }
});

export const useUser = () => useContext(UserContext);
