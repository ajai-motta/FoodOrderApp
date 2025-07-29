import { useEffect, useState,useCallback } from "react";

async function sendHttpRequest(url,config)
{
    let response;
    if(config && config.body){
    response=await fetch(url,config);

    }
    if(!config || !config.body){
        response=await fetch(url);
    }
const data=await response.json();
if(!response.ok){
    throw new Error(data.message || 'failed to fetch data');
}
return data;
}


export default function useHttp(url,config,initalData){
    const [data,setData]=useState(initalData);
    const [error,setError]=useState();
    const [isLoading,setIsLoading]=useState(false);
const sendRequest=useCallback(async function sendRequest(data){
    setIsLoading(true)
    try{
        if(data){
            
            
            const resdata=await sendHttpRequest(url,{...config,body:data});
            setData(resdata)
        }
        else{
            
            const resdata=await sendHttpRequest(url);
            setData(resdata)
        }
        
        
    }
    catch(error){
        setError(error.message || 'something went wrong');
    }
    setIsLoading(false);
},[url,config]);

useEffect(()=>{
    if((config && (config.method=== 'GET'|| !config.method))|| !config){
     sendRequest();
    }

},[sendRequest,config]);
return {
    data,error,isLoading,sendRequest
}
}