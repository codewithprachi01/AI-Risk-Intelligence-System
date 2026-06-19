import { useEffect, useState } from "react";
import API from "../services/api";


function Weather(){


const [city,setCity] = useState("Lucknow");

const [weather,setWeather] = useState(null);

const [loading,setLoading] = useState(false);




const fetchWeather = ()=>{


setLoading(true);


API.get(`/weather-data?city=${city}`)

.then((response)=>{

setWeather(response.data);

})

.catch((error)=>{

console.log(error);

alert("City weather not found");

})

.finally(()=>{

setLoading(false);

});


};




useEffect(()=>{

fetchWeather();

},[]);





return(


<div

className="
min-h-screen
p-10
text-white
bg-linear-to-br
from-[#050816]
via-[#101a3a]
to-[#001f3f]
"

>



<h1

className="
text-4xl
font-bold
text-cyan-400
"

>

🌦️ Weather & Climate Intelligence

</h1>



<p className="text-gray-300 mt-2">

AI powered real-time climate monitoring system

</p>






{/* Search */}


<div className="
flex
gap-4
mt-8
max-w-3xl
">


<input

value={city}

onChange={(e)=>setCity(e.target.value)}

placeholder="Enter city name"

className="
flex-1
p-4
rounded-xl
bg-white
text-black
placeholder-gray-500
"

/>



<button

onClick={fetchWeather}

className="
px-8
rounded-xl
bg-cyan-500
font-bold
"

>

Search

</button>



</div>








{

loading &&

<p className="mt-8 text-xl">

Loading weather data...

</p>

}






{

weather &&

<>



<div

className="
grid
grid-cols-1
md:grid-cols-3
gap-6
mt-10
"

>





{/* Temperature */}


<div

className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-6
"

>

<h2 className="text-xl font-bold">

🌡️ Temperature

</h2>


<p className="
text-5xl
font-bold
text-cyan-400
mt-5
">

{weather.temperature}°C

</p>


<p className="text-gray-300 mt-3">

Current Temperature

</p>


</div>







{/* Humidity */}


<div

className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-6
"

>


<h2 className="text-xl font-bold">

💧 Humidity

</h2>


<p className="
text-5xl
font-bold
text-blue-400
mt-5
">

{weather.humidity}%

</p>


<p className="text-gray-300 mt-3">

Air Humidity

</p>


</div>








{/* Condition */}


<div

className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-6
"

>


<h2 className="text-xl font-bold">

🌍 Condition

</h2>


<p className="
text-3xl
font-bold
text-yellow-400
mt-7
capitalize
">

{weather.condition}

</p>


<p className="text-gray-300 mt-3">

Weather Status

</p>


</div>



</div>









{/* Heat Risk */}



<div

className="
mt-8
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-8
"

>


<h2 className="
text-2xl
font-bold
mb-5
">

🔥 AI Heat Risk Analysis

</h2>




<div className="
grid
grid-cols-2
gap-5
">


<div

className="
bg-red-500/20
rounded-2xl
p-5
"

>


<p>

Heat Risk Level

</p>


<h3 className="
text-3xl
font-bold
text-red-400
mt-2
">

{weather.heat_level}

</h3>


</div>





<div

className="
bg-purple-500/20
rounded-2xl
p-5
"

>


<p>

Location

</p>


<h3 className="
text-3xl
font-bold
mt-2
">

{weather.city}

</h3>


</div>


</div>





<p className="
mt-6
text-gray-200
text-lg
">

⚠️ {weather.warning}

</p>





<h3 className="
text-xl
font-bold
mt-6
">

💡 AI Suggestions

</h3>




<ul className="
mt-3
space-y-3
text-gray-300
">

{

weather.suggestions?.map((item,index)=>(

<li key={index}>

✓ {item}

</li>


))

}


</ul>



</div>




</>


}



</div>


);


}


export default Weather;