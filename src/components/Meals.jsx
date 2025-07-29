import Error from "./UI/Error";
import MealItem from "./MealItem";
import useHttp from "./hooks/useHttp";
const requestConfig={}
export default function Meals(){
    
   const{data:loadedMeals,error,isLoading}=useHttp('http://localhost:3000/meals',requestConfig,[])
   if(isLoading){
    return <p className="center">Contents are Loading Please Wait</p>
   }
   if(error){
    return <Error title="An Error Occurred!" message={error} />
   }
   
    return <ul id="meals">{loadedMeals.map((meal)=>{
        return <MealItem key={meal.id} meal={meal} />
    })}</ul>
}