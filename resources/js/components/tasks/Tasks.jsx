import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useCategories from '../../custom/useCategories';
import {useDebounce} from 'use-debounce';



export default function Home(){

//1
const [tasks, setTasks] = useState([]); 
const [categories, setCategories] = useState([]);
//7
const [page, setPage] = useState(1); 
//10
const [catdId, setCatId] = useState(null); 
//12
const [orderBy, setOrderBy] = useState(null); 
//13 search
const [searchTerm, setSearchTerm] = useState(''); 
 // npm i use-debounce
const debouncedSearchTerm= useDebounce(searchTerm,300);



//3
useEffect(() => {
       
//pour eviter la repitition 
if(!categories.length){
fetchCategories(); 
}
if(!tasks.length){
 fetchTasks();
}
}, [page,catdId,orderBy,debouncedSearchTerm[0]])

//2
const fetchTasks = async ()=>{
    try{
        //10 category filter
        if(catdId){
       const response = await axios.get(`/api/category/${catdId}/tasks?page=${page}`);
      //5 remplir list array tast
        setTasks(response.data);
        }
        else if(orderBy){
        const response = await axios.get(`/api/search/${orderBy.column}/${orderBy.direction}/tasks?page=${page}`);
        setTasks(response.data);
        }
        else if(debouncedSearchTerm[0]){
        const response = await axios.get(`/api/search/${debouncedSearchTerm[0]}/tasks?page=${page}`);
        setTasks(response.data);
        }

        else{  
         const response = await axios.get(`/api/tasks?page=${page}`);
        //5 remplir list array tast
         setTasks(response.data);


        }
//4 get route 
 //       const response = await axios.get('/api/tasks');
 //7-1
     
    }catch(error){
        console.log(error);
    }

}
// 8 

const fetchPrevNextTasks=(link)=>{
const url = new URL(link);
setPage(url.searchParams.get('page'));
}
//7
const renderPagination=()=>(
   
<ul className="pagination">
   {
    tasks.links?.map((link,index)=>(
        <li key={index} className="page-ite">
        <a 
         style={{cursor:'pointer'}}
        //8
         onClick={()=>fetchPrevNextTasks(link.url)}
         className={`page-link ${link.active ? 'active' : ''}`}
         >
        {link.label.replace('&laquo;','').replace('&raquo;','')}
        </a>
        </li>
       ))
   }     
</ul>    
)




//6 {done} 

const checkIfTaskIsDone=(done)=>(
    done ? (
        <span className="badget bg-success">Done</span>
        ) :
    (
        <span className="badget bg-danger">Processing</span>
        )


    )

//9
const fetchCategories  = async ()=>{
 const fetchedCategories = await useCategories();
    console.log(fetchedCategories);
    setCategories(fetchedCategories);
}


return (
<div className='row my-5'>
  <div className="row my-3">
  <div className="col-md-4">
  <div className="form-group">
 {/* 13 serche*/}
  <input type="text"

   className="form-control rounded-0 border-darck"

   //important
   value={searchTerm}
   onChange={
    (event)=>{
        setCatId(null);
        setOrderBy(null);
        setPage(1);
        setSearchTerm(event.target.value);
    }
   }
   placeholder="search.."
    />

      
  </div>
  </div>
  </div>
  <div className="col-md-9 card">
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Done</th>
                            <th>Category</th>
                            <th>Created </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                   {
                            tasks.data?.map(task => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>{task.body}</td>
                                    <td>
                                    {
                                        checkIfTaskIsDone()
                                    }
                                       
                                    </td>
                                    <td>{task.category.name}</td>
                                    <td>{task.created_at}</td>
                                    <td className="d-flex">
                                    </td>
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                   {/* pagination 7-8*/}  
                    <div className="my-4 d-flex justify-content-between">
                    <div>
                    Showing {tasks.from || 0} to {tasks.from || 0} from {tasks.total} results.
                    </div>
                    <div>
                        {renderPagination()}
                    </div>
                </div>
  
  </div>
	
</div>
<div className="col-md-3">
 <div className="card">
  <div className="card-header text-center bg-white">
      <h5 className="mt-2">Filter by category</h5>
  </div>
  <div className="card-body">
    <div className="form-check">
        <input name="category" className="form-check-input" 
             onChange={() => {
             setCatId(null);
             setOrderBy(null);
             setPage(1);
             fetchTasks();
                    }}
                    //12
            checked={!catdId ? true : false}
             type="radio"/>
        <label className="form-check-label" htmlFor="category"> All</label>
    </div>
    {
      categories?.map(category => (
        <div className="form-check" key={category.id}>
            <input name="category" className="form-check-input" 
                onChange={() => {
                setPage(1);
                setOrderBy(null);
                setCatId(null);
                setCatId(event.target.value);
                        }}
                type="radio"
                value={category.id}
                id={category.id} 
                checked={catdId==category.id}
                />

            <label className="form-check-label" htmlFor={category.id}>{category.name}</label>
        </div>
            ))}   
  </div>



</div>
{/*12*/}
<div className="card mt-2">
 <div className="card-header text-center bg-white">
  <h5 className="mt-2">
    Order by 
  </h5>
 </div>
</div>
<div className="card-body">
    <div>
        <h6>ID</h6>
        <div className="form-check">
        <input name="id" className="form-check-input" 
             value="asc"
             onChange={(event) => {
             setCatId(null);
             setPage(1);
             setOrderBy({
                column:'id',
                direction:event.target.value
             })
                    }}
                    checked={orderBy &&  orderBy.column==='id' && orderBy.direction === 'asc' ? true :false}
             type="radio"/>
        <label className="form-check-label" htmlFor="id"><i className="fas fa-arrow-up"></i></label>
    </div>
    </div>
        <div>
       
        <div className="form-check">
        <input name="id" className="form-check-input" 
             value="desc"
             onChange={(event) => {
             setCatId(null);
             setPage(1);
             setOrderBy({
                column:'id',direction:event.target.value
             });
                }
                }
            checked={orderBy &&  orderBy.column==='id' && orderBy.direction === 'desc' ? true :false}

             type="radio"/>
        <label className="form-check-label" htmlFor="id"><i className="fas fa-arrow-down"></i></label>
    </div>
    </div> 
</div>
<hr/>


<div className="card-body">
    <div>
        <h6>Oder by title</h6>
        <div className="form-check">
        <input name="title" className="form-check-input" 
             value="asc"
             onChange={(event) => {
             setCatId(null);
             setPage(1);
             setOrderBy({
                column:'title',
                direction:event.target.value
             })
                    }}
                    checked={orderBy &&  orderBy.column==='title' && orderBy.direction === 'asc' ? true :false}
             type="radio"/>
        <label className="form-check-label" htmlFor="title">A-Z</label>
    </div>
    </div>
        <div>
        
        <div className="form-check">
        <input name="title" className="form-check-input" 
             value="desc"
             onChange={(event) => {
             setCatId(null);
             setPage(1);
             setOrderBy({
                column:'title',direction:event.target.value
             });
                }
                }
            checked={orderBy &&  orderBy.column==='title' && orderBy.direction === 'desc' ? true :false}

             type="radio"/>
        <label className="form-check-label" htmlFor="id">Z-A</label>
    </div>
    </div> 
</div>
</div>

</div>
)
}