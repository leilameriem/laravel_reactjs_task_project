import axios from 'axios';
import React, { useEffect,useState } from 'react';


export default function Home(){
	//1
	const [tasks,setTasks]=useState([]);
	const [categories,setCategories]=useState([]);

    //3
    useEffect(()=>{
    	fetchTasks();
    },[]);

    //2
	const fetchTasks= async () =>{
		try{
          const response = await axios.get('/api/tasks');
		  setTasks(response.data); 
		}catch(error){
         console.log(error);
		}

	}
	return (
	<div>Task</div>
	)
}