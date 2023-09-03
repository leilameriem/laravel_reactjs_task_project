import axios from "axios";
//1
const useCategories = async () =>{
	try{
		const response = await  axios.get('/api/categories');
		return response.data;

	}catch(error){

	}
}
//2
export default useCategories;