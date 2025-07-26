import { useEffect,useState } from "react";
import MealItem from "./MealItem";
export default function Meals(){
    const [loadedMeals,setLoadedMeals]=useState([])
    useEffect(()=>{
        async function fetchMeals(){
        const response= await fetch('http://localhost:3000/meals');
        if(!response.ok){
            throw new Error('failed to fetch meals')
        }
        const resData=await response.json()
        setLoadedMeals(resData)
    }
    fetchMeals()
    },[])
   
    return <ul id="meals">{loadedMeals.map((meal)=>{
        return <MealItem key={meal.id} meal={meal} />
    })}</ul>
}