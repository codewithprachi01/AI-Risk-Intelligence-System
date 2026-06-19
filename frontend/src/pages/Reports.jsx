import { useEffect, useState } from "react";
import API from "../services/api";


function Reports(){

const [reports,setReports] = useState([]);

const [search,setSearch] = useState("");

const [date,setDate] = useState("");

const [status,setStatus] = useState("ALL");



useEffect(()=>{


API.get("/dashboard-data")

.then((res)=>{

setReports(res.data.reports || []);

})

.catch((err)=>{

console.log(err);

});


},[]);





const filteredReports = reports.filter((item)=>{


const matchSearch =
item.risk
?.toLowerCase()
.includes(search.toLowerCase());



const matchDate =
item.date?.includes(date);



const matchStatus =
status==="ALL" ||
item.status===status;



return (
matchSearch &&
matchDate &&
matchStatus
);


});





const high =
reports.filter(
(r)=>r.status==="HIGH"
).length;



const medium =
reports.filter(
(r)=>r.status==="MEDIUM"
).length;



const low =
reports.filter(
(r)=>r.status==="LOW"
).length;



const average =
reports.length
?
(
reports.reduce(
(sum,r)=>sum+r.score,
0
)/reports.length
).toFixed(1)

:0;





const downloadReport = ()=>{


const text = filteredReports.map((r)=>


`
Risk Type: ${r.risk}

Score: ${r.score}%

Status: ${r.status}

Date: ${r.date}


AI Analysis:
${r.explanation || "No explanation"}


Recommendation:
${r.recommendation || "No recommendation"}


-------------------------
`

).join("\n");



const blob = new Blob(
[text],
{type:"text/plain"}
);


const url = URL.createObjectURL(blob);


const a=document.createElement("a");

a.href=url;

a.download="AI_Risk_Analysis_Report.txt";

a.click();


};






return(

<div className="
min-h-screen
p-10
text-white
bg-linear-to-br
from-[#050816]
via-[#17153b]
to-[#001f3f]
">



<h1 className="
text-4xl
font-bold
bg-linear-to-r
from-cyan-400
to-purple-500
text-transparent
bg-clip-text
">

📄 AI Risk Intelligence Reports

</h1>


<p className="text-gray-300 mt-2">

Previous AI risk analysis with intelligent insights

</p>





<div className="
grid
grid-cols-4
gap-6
mt-8
">


<div className="bg-white/10 p-6 rounded-3xl">

<h2>Total Reports</h2>

<p className="text-4xl font-bold text-cyan-400">

{reports.length}

</p>

</div>



<div className="bg-white/10 p-6 rounded-3xl">

<h2>High Alerts</h2>

<p className="text-4xl font-bold text-red-400">

{high}

</p>

</div>




<div className="bg-white/10 p-6 rounded-3xl">

<h2>Medium</h2>

<p className="text-4xl font-bold text-yellow-400">

{medium}

</p>

</div>



<div className="bg-white/10 p-6 rounded-3xl">

<h2>Average Score</h2>

<p className="text-4xl font-bold text-green-400">

{average}%

</p>

</div>



</div>






<div className="
mt-10
flex
gap-5
">


<input

placeholder="🔍 Search Risk"

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
p-3
rounded-xl
text-black
flex-1
"

/>



<input

type="text"

placeholder="📅 DD-MM-YYYY"

value={date}

onChange={(e)=>setDate(e.target.value)}

className="
p-3
rounded-xl
text-black
w-52
"

/>



<select

value={status}

onChange={(e)=>setStatus(e.target.value)}

className="
p-3
rounded-xl
text-black
"

>

<option>
ALL
</option>

<option>
HIGH
</option>

<option>
MEDIUM
</option>

<option>
LOW
</option>


</select>



</div>







<div className="
grid
grid-cols-2
gap-6
mt-10
">



{

filteredReports.map((item,index)=>{


let color =
item.status==="HIGH"
?
"border-red-500"

:

item.status==="MEDIUM"
?
"border-yellow-400"

:

"border-green-500";



return(


<div

key={index}

className={`
bg-white/10
rounded-3xl
p-6
border-2
${color}
`}

>


<h2 className="text-2xl font-bold">

{item.risk}

</h2>


<p className="mt-3">

📊 Score:

<span className="font-bold">

 {item.score}%

</span>

</p>



<p>

🚦 Status:

<span className="font-bold">

 {item.status}

</span>

</p>



<p>

📅 Date:

{item.date}

</p>




<div className="mt-5">


<h3 className="font-bold text-cyan-300">

🧠 AI Analysis

</h3>


<p className="text-gray-200">

{item.explanation}

</p>



</div>




<div className="mt-5">


<h3 className="font-bold text-purple-300">

💡 Recommendation

</h3>


<p>

{item.recommendation}

</p>


</div>




</div>


)


})


}


</div>





<button

onClick={downloadReport}

className="
mt-10
px-8
py-3
rounded-xl
font-bold
bg-linear-to-r
from-green-500
to-cyan-500
"

>

📥 Download Analysis Report

</button>





</div>


);


}


export default Reports;