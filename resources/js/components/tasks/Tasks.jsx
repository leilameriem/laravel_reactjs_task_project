import axios from 'axios';
import React, { useEffect, useState } from 'react';



export default function Home(){

	//1
    const [tasks, setTasks] = useState([]); 
    const [categories, setCategories] = useState([]);
    //7
    const [page, setPage] = useState(1); 



    //3
    useEffect(() => {
            fetchTasks();  
    }, [page])

    //2
	const fetchTasks = async ()=>{
        try{
    //4 get route 
     //       const response = await axios.get('/api/tasks');
     //7-1
           const response = await axios.get(`/api/tasks?page=${page}`);
    //5 remplir list array tast
    setTasks(response.data);
            console.log(tasks.length);


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


	return (
	<div className='row my-5'>
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
	</div>
	)
}