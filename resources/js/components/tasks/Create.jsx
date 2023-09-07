import React from 'react';
import {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import useCategories from '../../custom/useCategories';
import Swal from 'sweetalert2';




export default function Create(){
const[title,setTitle]=useState('');
const[body,setBody]=useState('');
const[categoryId,setCategoryId]=useState('');
const[loading,setLoading]=useState(false);
const navigate=useNavigate();
const [categories, setCategories] = useState([]);
///bug
const [errors, setErrors] = useState([]); 


const fetchCategories  = async ()=>{
  const fetchedCategories = await useCategories();
  setCategories(fetchedCategories);
}
useEffect(() => {
   
//pour eviter la repitition 
  if(!categories.length){
    fetchCategories(); 
}


}, [])


///fonction add
const createTask =async(e)=>{
	setLoading(true);
	e.preventDefault();
	const task ={
		title,
		body:body,
		category_id:categoryId
	}
	console.log(task);
	try{

   const response = await axios.post('/api/tasks',task);
   Swal.fire({
   	position:'top-end',
   	icon:'success',
   	title:'Your task has been saved.',
   	showConfirmButton:false,
   	timer:1500
   });
   	setLoading(false);
   navigate('/');
	}catch(error){
		setLoading(false);
		console.log(error);
		setErrors(error.response.data.errors);

	}
}

///test  pour supprimer return blaset =>{} diri =>()
const renderErrors =(field)=>(
	  errors?.[field]?.map((error,index)=> (
		<div key={index} className="text-white my-2 rounded p-2 bg-danger">
            {error}
		</div>
		))
)



return (
	<div className="row my-5">
	<div className="col-md-6 mx-a">
	<div className="card">
	<div className="card-header bg-white">
  <h5 className="text-center mt-2">
  create new task
  </h5>
	</div>


	</div>
    <form className="mt-5" onSubmit={(e) => createTask(e)}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title*</label>
                <input 
                  type="text" 
                  name="title"
                  className="form-control" 
                  placeholder="Title*" 
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  />
                  {renderErrors('title')}
            </div>
            <div className="mb-3">
                <label htmlFor="body" className="form-label">Description*</label>
                <textarea 
                  className="form-control" 
                  name="body" 
                  value={body}
                  onChange={(e)=>setBody(e.target.value)}
                  placeholder="Body*"
                  rows="3"></textarea>
                   {renderErrors('body')}

                  
            </div>
             <div className="mb-3">
                    <label htmlFor="category_id" className="form-label">Category*</label>
                    <select 
                        name="category_id" 
                        onChange={(e) => setCategoryId(e.target.value)}
                        value={categoryId}
                        className="form-select">
                      <option value="" disabled>Choose a category</option>
                      {
                        categories?.map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                      }
                    </select>
                     {renderErrors('category_id')}

                </div>
              <div className="mb-3">
              {
                    loading ? 
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      :
                      <button
                          type="submit" 
                          className="btn btn-primary">
                          Create
                      </button>
                  }
                  
                </div>
          </form>
	</div>
	</div>
	)
}