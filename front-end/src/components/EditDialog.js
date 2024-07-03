import axios from "axios";
import {useContext, useState} from "react";
import {MyContext} from "./MyContext";

function EditDialog()
{
    const {token}=useContext(MyContext);
    const [updateBudget,setUpdateBudget]=useState('');
    const handleEditClick=()=>{
        axios.put('http://localhost:8080/budget/update',{'budget':updateBudget},{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
            .then((res)=>{
                if(res)
                {
                    alert(res.data);
                }
            })
            .catch((err)=>{
                console.error(err);
                alert("error updating budget");
            })
            .finally(()=>{
                const timer=setTimeout(()=>{
                    window.location.reload();
                },400);
                return () => clearTimeout(timer);

            })
    }
    return (
 <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Budget</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <label htmlFor='updateBudget'>Set Limit</label>
                    <input  type='number' name='updateBudget' value={updateBudget} onChange={(e)=>setUpdateBudget(e.target.value)}/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={handleEditClick}>Update</button>
                </div>
            </div>
        </div>
    </div>

    );
}
export default EditDialog;