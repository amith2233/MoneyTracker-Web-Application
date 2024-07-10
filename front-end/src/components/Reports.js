import {DatePicker} from "@mui/x-date-pickers";
import {useContext, useState} from "react";
import Box from '@mui/material/Box';
import {FormControl, Input, InputAdornment, InputLabel, MenuItem, Select} from "@mui/material";
import {MyContext} from "./MyContext";
import axios from "axios";
import ReportsTable from "./ReportsTable";

function Reports()
{

    const [isVisible,setIsVisible]=useState(false);
    const[reports,setReports]=useState({
        startDate:null,
        endDate:null,
        category:'',
        startAmount:0,
        endAmount:0,
        transactionType:''
    });
    const [filteredExpense,setExpense]=useState([]);
    const {token}=useContext(MyContext);
    const handleChange=(e)=>
    {
            setReports({...reports, [e.target.name]: e.target.value});

    }
    const handleSubmit=(e)=>
    {
        setIsVisible(true);
        e.preventDefault();
        axios.post("http://localhost:8080/expenses/reports",reports,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
            .then((res)=>{
                setExpense(res.data);
            })
            .catch((error)=>{
                console.error(error);
            })
        // console.log(reports);
    }

    return (
        <div className='reports'>
            <h3>Expense Report</h3>
            <form className='reports-form' onSubmit={handleSubmit}>
            <div className='reports-form-top'>
                <DatePicker sx={{minWidth:'120px'}} label='start-date' value={reports.startDate} onChange={(date)=>handleChange({target:{name:'startDate',value:date}})}/>
                <DatePicker label='end-date' value={reports.endDate}  onChange={(date)=>handleChange({target:{name:'endDate',value:date}})}/>

                    <FormControl variant="standard" sx={{minWidth: 140 }}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            name="category"
                            value={reports.category}
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>All</em></MenuItem>
                            <MenuItem value="shopping">Shopping</MenuItem>
                            <MenuItem value="food">Food</MenuItem>
                            <MenuItem value="groceries">Groceries</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            <div className='reports-form-bottom'>
                <p>Amount Range</p>
                <Box style={{display:'flex',gap:'4em'}}>

                    <FormControl sx={{minWidth:255}} variant="standard">
                        <InputLabel htmlFor="start-amount">From</InputLabel>
                        <Input
                            id="start-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            name='startAmount'
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl  sx={{minWidth:255}} variant="standard">
                        <InputLabel htmlFor="end-amount">To</InputLabel>
                        <Input
                            id="end-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            name='endAmount'
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl variant="standard" sx={{minWidth: 160 }}>
                        <InputLabel id="demo-simple-select-standard-label">Transaction Type</InputLabel>
                        <Select
                            name="transactionType"
                            value={reports.transactionType}
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>All</em></MenuItem>
                            <MenuItem value="cash">Cash</MenuItem>
                            <MenuItem value="credit card">credit card</MenuItem>
                            <MenuItem value="apple pay">apple pay</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

            </div>
            <div className='button-container'>
                <button className='profile-submit-button' type='Submit'>Submit</button>
            </div>
            </form>
            { isVisible && <ReportsTable filteredExpense={filteredExpense}/>}

        </div>

    );
}
export default Reports;