import axios from 'axios';
import React, { useEffect, useState } from 'react';



export default function Home(){

	//1
    const [tasks, setTasks] = useState([]); 
    const [categories, setCategories] = useState([]);

    //3
    useEffect(() => {
            fetchTasks();  
    }, [])

    //2
	const fetchTasks = async ()=>{
        try{
    //4 get route 
            const response = await axios.get('/api/tasks');
    //5 remplir list array tast
    setTasks(response.data);
            console.log(tasks.length);


        }catch(error){
            console.log(error);
        }

    }
    // {done} 

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
	  
	  </div>
		
	</div>
	</div>
	)
}