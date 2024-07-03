import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {MyContext} from "./MyContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from '@fortawesome/free-solid-svg-icons'

function AddExpense({setIsAddVisible,expenseToEdit,clearExpenseToEdit})
{
    const {token}=useContext(MyContext);
    const [expense,setExpense]=useState({
        expenseName: '',
        description: '',
        category: '',
        amount: '',
        paymentType: ''
    });
    const handleChange=(e)=>
    {
        setExpense({...expense,[e.target.name]:e.target.value});
    }
    useEffect(()=>{
        if(expenseToEdit)
        {
            setExpense(expenseToEdit);
        }
    },[expenseToEdit])
    const url=expenseToEdit?`http://localhost:8080/expense/${expenseToEdit.expenseId}`:"http://localhost:8080/addexpense";
    const method=expenseToEdit?'put':'post';
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        axios[method](url, expense, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res)=>
            {
                if(res)
                {
                    alert(`Expense ${expenseToEdit?'updated':'added'} successfully`);

                }
            })
            .catch((error)=>
            {
                console.log(error);
            });
        setExpense({
            expenseName: '',
            description: '',
            category: '',
            amount: '',
            paymentType: ''
        });
        setIsAddVisible(false);
    }
    const handleClose=()=>
    {
        clearExpenseToEdit();
        setIsAddVisible(false);
    }
    return(
        <div className='add-expense'>
            <div className='cancel-button'><FontAwesomeIcon onClick={handleClose} icon={faXmark}/></div>
            <form className='add-expense-form' onSubmit={handleSubmit}>

                <div className='expense-label-input'>
                     <label>Name</label>
                     <input type='text' name='expenseName' value={expense.expenseName} onChange={handleChange}/>
                </div>
                <div className='expense-label-input'>
                    <label>Description</label>
                    <input type='text' name='description' value={expense.description} onChange={handleChange}/>
                </div>
                <div className='expense-label-input'>
                    <label>Category</label>
                    <input type='text' name='category' value={expense.category} onChange={handleChange}/>
                </div>
                <div className='expense-label-input'>
                    <label>PaymentType</label>
                    <input type='text' name='paymentType' value={expense.paymentType} onChange={handleChange}/>
                </div>
                <div className='expense-label-input'>
                    <label>Amount</label>
                    <input type='number' name='amount' value={expense.amount} onChange={handleChange}/>$
                </div>
                <div className='submit-button-container expense-container'>
                    <button className='profile-submit-button' type='submit'>{expenseToEdit?'Update':'Add'}</button>
                </div>
            </form>
        </div>

    );
}
export default AddExpense;