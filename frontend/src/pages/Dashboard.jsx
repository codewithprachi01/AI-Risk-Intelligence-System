import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { Pie, Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);



function Dashboard(){


const [data,setData] = useState({

    total:0,
    high:0,
    medium:0,
    low:0,
    categories:{},
    reports:[],
    explanations:[]

});



useEffect(()=>{

fetchDashboard();

},[]);




const fetchDashboard = async()=>{


try{


const response = await API.get("/dashboard-data");


setData(response.data);


}

catch(error){

console.log(error);

}


};




const pieData = {

labels:[
    "High Risk",
    "Medium Risk",
    "Low Risk"
],

datasets:[{

    data:[
        data.high,
        data.medium,
        data.low
    ],

    backgroundColor:[
        "#ef4444", // red
        "#facc15", // yellow
        "#22c55e"  // green
    ],

    borderColor:[
        "#ffffff",
        "#ffffff",
        "#ffffff"
    ],

    borderWidth:2

}]

};
const chartOptions = {

plugins:{
    legend:{
        labels:{
            color:"white"
        }
    }
},

scales:{
    x:{
        ticks:{
            color:"white"
        }
    },
    y:{
        ticks:{
            color:"white"
        }
    }
}

};




const categoryData = {

labels:Object.keys(data.categories),

datasets:[{

    label:"Risk Categories",

    data:Object.values(data.categories),

    backgroundColor:[
        "#06b6d4",
        "#3b82f6",
        "#8b5cf6",
        "#ec4899",
        "#ef4444",
        "#f97316",
        "#facc15",
        "#22c55e",
        "#14b8a6",
        "#6366f1",
        "#84cc16",
        "#eab308",
        "#d946ef",
        "#0ea5e9",
        "#10b981"
    ],

    borderRadius:10

}]

};
return(


<div

className="
flex
min-h-screen
bg-linear-to-br
from-[#050816]
via-[#101a3a]
to-[#001f3f]
"

>


<Sidebar />



<div className="flex-1">


<Navbar />



<main

id="dashboard"

className="
p-8
text-white
"

>



<h1

className="
text-4xl
font-bold
bg-linear-to-r
from-cyan-400
to-purple-500
text-transparent
bg-clip-text
"

>

AI Multi-Risk Intelligence Dashboard 🚀

</h1>



<p className="text-gray-300 mt-2">

Real Time AI Risk Monitoring System

</p>






<div

className="
grid
grid-cols-4
gap-6
mt-8
"

>


<Card

title="Total Predictions"

value={data.total}

color="text-cyan-400"

icon="📊"

/>




<Card

title="High Risk"

value={data.high}

color="text-red-400"

icon="🚨"

/>




<Card

title="Medium Risk"

value={data.medium}

color="text-yellow-400"

icon="⚠️"

/>




<Card

title="Low Risk"

value={data.low}

color="text-green-400"

icon="✅"

/>



</div>
<div

className="
grid
grid-cols-2
gap-8
mt-10
"

>



<div

className="
bg-white/10
rounded-3xl
p-7
"

>


<h2 className="
text-xl
font-bold
mb-5
">

📈 Risk Distribution

</h2>



<div className="bg-white/5 rounded-2xl p-5">

<Pie data={pieData}/>

</div>


</div>







<div

className="
bg-white/10
rounded-3xl
p-7
"

>


<h2 className="
text-xl
font-bold
mb-5
">

📊 Risk Categories

</h2>



<div className="bg-white/5 rounded-2xl p-5">

<Bar data={categoryData}/>

</div>


</div>




</div>
{/* Recent Risk History */}

<div

className="
mt-10
bg-white/10
rounded-3xl
p-7
"

>


<h2 className="
text-2xl
font-bold
mb-5
">

🕒 Recent Risk Analysis

</h2>



<div className="overflow-x-auto">


<table className="w-full text-left">


<thead>


<tr className="
border-b
border-white/20
">


<th className="p-3">
Date
</th>


<th className="p-3">
Risk Type
</th>


<th className="p-3">
Score
</th>


<th className="p-3">
Status
</th>


</tr>


</thead>



<tbody>


{

data.reports?.slice(0,10).map(

(item,index)=>(


<tr

key={index}

className="
border-b
border-white/10
"

>


<td className="p-3">

{item.date}

</td>


<td className="p-3">

{item.risk}

</td>


<td className="p-3">

{item.score}%

</td>


<td className="p-3">

{item.status}

</td>


</tr>


)


)


}


</tbody>


</table>


</div>
{/* AI Risk Explanation */}

<div

className="
mt-10
bg-white/10
rounded-3xl
p-7
"

>


<h2 className="
text-2xl
font-bold
mb-5
">

🧠 AI Risk Explanation

</h2>


{

data.explanations?.map((item,index)=>(

<div

key={index}

className="
bg-white/5
rounded-2xl
p-5
mb-4
"

>


<p>
<b>Risk Type:</b> {item.risk_type}
</p>


<p>
<b>Score:</b> {item.score}%
</p>


<p>
<b>Status:</b> {item.status}
</p>


<p className="mt-3">

<b>Reason:</b><br/>

{item.reason}

</p>


<p className="mt-3">

<b>Suggestion:</b><br/>

{item.suggestion}

</p>


</div>


))

}


</div>


</div>


</main>


</div>


</div>


);


}





function Card({

title,
value,
color,
icon

}){


return(


<div

className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-6
hover:scale-105
transition
"

>


<div className="text-3xl">

{icon}

</div>



<p className="
text-gray-300
mt-4
">

{title}

</p>




<h2

className={`
text-5xl
font-bold
mt-3
${color}
`}

>

{value}

</h2>



</div>


);


}





export default Dashboard;