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
            const response = await axios.get('/api/tasks');
            setTasks(response.data.data);
            console.log(tasks.length);


        }catch(error){
            console.log(error);
        }

    }
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
                                <th>Created</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                    </table>
	  
	  </div>
		
	</div>
	</div>
	)
}