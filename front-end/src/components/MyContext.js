import {createContext} from "react";
import LoginToken from "./LoginToken";

const MyContext=createContext("");

const MyProvider=({children})=>
{
    const {token,setToken,delToken}=LoginToken();

    return (
        <MyContext.Provider value={{token,setToken,delToken}}>
            {children}
        </MyContext.Provider>

    );
}

export {MyContext,MyProvider};