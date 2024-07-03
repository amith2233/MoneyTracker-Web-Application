import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faFileLines,faListCheck,faChartLine,faBarsProgress,faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useState} from "react";

function SideNav({setComponent})
{
    const [collapse,setCollapse]=useState(false);
    const [selectedLabel,setSelectedLabel]=useState('Dashboard');
    const toggleCollapse=()=>
    {
        setCollapse(!collapse);
    }
    const handleClick=(e)=>
    {
        const lielement=e.currentTarget;
        const span=lielement.querySelector('.SideNav-text');
        if(span)
        {
            setComponent(span.innerHTML);
            setSelectedLabel(span.innerHTML);
        }
        else
        {
            const icon=lielement.querySelector('.SideNav-icon');
            if(icon)
            {
                const iconName=icon.getAttribute('data-icon');
                let label='';
                switch(iconName)
                {
                    case 'bars-progress':
                        label='Dashboard';
                        break;
                    case 'list-check':
                        label='Manage';
                        break;
                    case 'file-lines':
                        label='Reports';
                        break;
                    case 'chart-line':
                        label='Analytics';
                        break;
                    case 'user':
                        label='Profile';
                        break;
                    default:
                        label='Dashboard';
                }
                setSelectedLabel(label);
                setComponent(label);

            }

        }

    }
    return(
        <nav className={`SideNav ${collapse ? 'SideNav-collapsed':'SideNav-default'}`} >
            <div className='SideNav-icons-container'>
            <ul className='SideNav-labels'>
                <li className={`SideNav-labels-li ${ selectedLabel==='Dashboard' ? 'selected-label' : ''}`} onClick={handleClick}>
                    <FontAwesomeIcon icon={faBarsProgress} className='SideNav-icon'/>
                    {!collapse && <span className='SideNav-text'>Dashboard</span>}
                </li>
                <li className={`SideNav-labels-li ${ selectedLabel==='Manage' ? 'selected-label' : ''}`} onClick={handleClick}>
                    <FontAwesomeIcon icon={faListCheck} className='SideNav-icon'/>
                    {!collapse && <span className='SideNav-text'>Manage</span>}
                </li>
                <li className={`SideNav-labels-li ${ selectedLabel==='Reports' ? 'selected-label' : ''}`}onClick={handleClick}>
                    <FontAwesomeIcon icon={faFileLines} className='SideNav-icon'/>
                    {!collapse &&<span className='SideNav-text'>Reports</span>}
                </li>
                <li className={`SideNav-labels-li ${ selectedLabel==='Analytics' ? 'selected-label' : ''}`} onClick={handleClick}>
                    <FontAwesomeIcon icon={faChartLine} className='SideNav-icon'/>
                    {!collapse &&<span className='SideNav-text'>Analytics</span>}
                </li>
                <li className={`SideNav-labels-li ${ selectedLabel==='Profile' ? 'selected-label' : ''}`} onClick={handleClick}>
                    <FontAwesomeIcon icon={faUser} className='SideNav-icon'/>
                    {!collapse && <span className='SideNav-text'>Profile</span> }
                </li>
            </ul>
             </div>

            <div className='SideNav-slider'><FontAwesomeIcon icon={faCircleChevronLeft} className={`svg-icon ${collapse?'svg-icon-collapsed':null}` }onClick={toggleCollapse}/></div>

        </nav>

    );
}
export default SideNav;