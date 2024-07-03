import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import { format } from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare,faTrashCan} from "@fortawesome/free-solid-svg-icons"
import geometricAbstractImage from "../assets/geometric-abstract-light-blue-background-for-website-wallpapers-bussines-templates-vector.jpg";
import {MyContext} from "./MyContext";
import AddExpense from "./AddExpense";
import {CSSTransition, TransitionGroup} from "react-transition-group";



function Expenses()
{
    const {token}=useContext(MyContext);
    const [expenses,setExpense]=useState([]);
    const [category,setCategory]=useState('');
    const[showButton,setShowButton]=useState(true);
    const [isAddVisible,setIsAddVisible]=useState(false);
    const [expenseToEdit,setExpenseToEdit]=useState(null);
    const myNodeRef=useRef(null);

    const handleEdit=(exp)=>
    {
        setExpenseToEdit(exp);
        setIsAddVisible(true);
    }

    const handleChange=(e)=>
    {
        setCategory(e.target.value)
    }

    const filteredExpense=category?expenses.filter((exp)=>exp.category===category):expenses;
    useEffect(()=>
    {
        axios.get("http://localhost:8080/expenses/userid",{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
            .then((res)=>
            {
                setExpense(res.data);
            })
            .catch((error)=>{
                console.log(error);
            })

    },[token]);
    const handleAdd=(e)=>
    {
        e.preventDefault();
        setIsAddVisible(true);
    }
    const clearExpenseToEdit=()=>
    {
        setExpenseToEdit(null);

    }
    const handleDelete=(exp)=>
    {
        axios.delete(`http://localhost:8080/expense/${exp.expenseId}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }).then((res)=>
        {
            if((res))
            {
                console.log(res.data);
                setExpense(prevExp=>prevExp.filter(item=>item.expenseId!==exp.expenseId));
            }

        })
            .catch((error)=>{
                console.error('Error deleting expense',error);
            });

    }
    return (
        <div className='expenses'>
            <div className='expenses-header'>
                    <h1>Expenses</h1>
                {showButton && <div className='add-expense-button' onClick={handleAdd}>Add Expense +</div>}
            </div>
            <div className='all-expenses'>
                <select className='category-dropdown' value={category} onChange={handleChange}>
                    <option value="">All Expenses</option>
                    <option value="shopping">Shopping</option>
                    <option value="food">Food</option>
                    <option value="groceries">Groceries</option>
                </select>
            </div>

            <TransitionGroup className={`expenses-body ${isAddVisible? 'blurred':''}`}>
                {
                filteredExpense.map((exp)=>(
                    <CSSTransition nodeRef={myNodeRef} key={exp.expenseId} timeout={500} classNames='expense-items' >
                    <div  ref={myNodeRef} className='expenses-body-items' >
                        <div className='items-left'>
                            <div className='expenses-name-description'>
                                <h3 style={{margin:'0px'}}>{exp.expenseName}</h3>
                                <p style={{fontFamily:'Almarai',margin:'0px'}}>{exp.description}</p>
                            </div>
                            <div><span className='expenses-category'>{exp.category}</span></div>
                        </div>
                        <div className='items-right'>
                            <div className='expenses-amount-date-payment'>
                                <div className='expenses-amount-date'>
                                <p>${exp.amount}</p>
                                <p>{format(exp.date, 'MMM dd')}</p>
                                </div>
                                <div className='expenses-payment'>payment : {exp.paymentType}</div>
                                </div>
                            <div className='expenses-image'><img src={geometricAbstractImage} alt='not found'/></div>
                            <div className='expenses-edit'>
                                <FontAwesomeIcon icon={faPenToSquare} style={{color:'rgba(9, 62, 165,0.7)'}} onClick={()=>handleEdit(exp)}/>
                                <FontAwesomeIcon icon={faTrashCan} style={{color:'rgba(9, 62, 165,0.7)'}} onClick={()=>handleDelete(exp)}/>
                            </div>
                        </div>

                    </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
                <CSSTransition nodeRef={myNodeRef} in={isAddVisible} timeout={300} classNames='AddExpense' unmountOnExit onEnter={()=>setShowButton(false)} onExit={()=>setShowButton(true)}  >
                <div className='add-expense-model' ref={myNodeRef}><AddExpense setIsAddVisible={setIsAddVisible} expenseToEdit={expenseToEdit} clearExpenseToEdit={clearExpenseToEdit}/></div>
                </CSSTransition>
        </div>

    );
}
export default Expenses;