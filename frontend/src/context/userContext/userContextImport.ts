import {createContext, useContext} from "react";
import {ApiResObj} from "../../components/types/dto/ApiResObj.ts";
import {UserNamePasswordDTO} from "../../components/types/dto/UserNamePasswordDTO.ts";
import {User} from "../../components/types/User.ts";

interface UserContextType {
  user: User | undefined | null;
  login: (creds: UserNamePasswordDTO) => Promise<ApiResObj>;
  logout: ()=> void;
}

export const UserContext = createContext<UserContextType>({
  user: undefined,
  login: () : Promise<ApiResObj> => new Promise(()=>{}),
  logout: () => {
  }
});

export const useUser = () => useContext(UserContext);
