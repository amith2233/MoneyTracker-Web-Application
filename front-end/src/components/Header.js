import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {useContext} from "react";
import {MyContext} from "./MyContext";
function Header()
{
    const {token,delToken}=useContext(MyContext);
    const handleClick=()=>
    {
        delToken();
    }
    const headerClassName=token ? 'header header-logged-in':'header header-default';
    return(
        <div className={headerClassName} >
            <div className='header-title'>
                <img src="MoneyTracker.png" alt="not found"/>
                <p>MoneyTracker</p>
            </div>
            <div className='header-body'>
                { !token ?
                    <>
                    <Link>About</Link>
                    <Link>Contact Us</Link>
                    <Link to="/login">Login</Link>
                    </>

                    :
                    <>
                        <p><span className='logout-text'>Logout</span><FontAwesomeIcon icon={faRightFromBracket} onClick={handleClick}/></p>
                    </>


                }
            </div>
        </div>

    );
}
export default Header;