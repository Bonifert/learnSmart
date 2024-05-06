import {createContext, useContext} from "react";
import {ApiResObj} from "../../type/dtos/ApiResObj.ts";
import {UsernamePasswordDTO} from "../../type/dtos/UsernamePasswordDTO.ts";
import {User} from "../../type/User.ts";

interface UserContextType {
  user: User | undefined | null;
  login: (creds: UsernamePasswordDTO) => Promise<ApiResObj>;
  logout: ()=> void;
}

export const UserContext = createContext<UserContextType>({
  user: undefined,
  login: () : Promise<ApiResObj> => new Promise(()=>{}),
  logout: () => {
  }
});

export const useUser = () => useContext(UserContext);
