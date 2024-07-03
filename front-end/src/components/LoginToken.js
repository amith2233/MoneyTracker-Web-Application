import {useState} from "react";

function LoginToken()
{
    const getToken=()=>
    {
        const tokenString=sessionStorage.getItem('Token');
        const usertoken=JSON.parse(tokenString);
        return usertoken?.jwt;
    }

    const [token,setToken]=useState(getToken());

    const setLoginToken=(token1)=>
    {
        sessionStorage.setItem('Token',JSON.stringify(token1));
        setToken(token1.jwt);
    }

    const deleteLoginToken=()=>
    {
        sessionStorage.clear();
        setToken('');
    }

    return{
        setToken:setLoginToken,
        delToken:deleteLoginToken,
        token
    }
}
export default LoginToken;