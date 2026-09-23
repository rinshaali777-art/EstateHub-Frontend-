import axios from 'axios'


  const axiosinstance = axios.create({
  baseURL: "https://estatehub-backend-server-2.onrender.com/",
  timeout: 5000,

})
// response  interceptors:hnadling global/ common errors

axiosinstance.interceptors.response.use(
    (response)=>{
        console.log("reponse received");
        return response
        
    },

    (error)=>{
        if(error.response){
            const status=error.response.status
            if(status==401){
                console.log("Un-Authorized");
                
            }
            else if(status==404){
                console.log("API not found");
                
            }
            else if(status==500){
                console.log("server error!");
                
            }
            else if(error.request){
                console.log("No response from server");
                
            }
            else{
                console.log("Error"+error.message);
                
            }
            return Promise.reject(error)
        }
    }

)
export default axiosinstance