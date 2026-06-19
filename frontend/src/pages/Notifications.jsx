import { useEffect, useState } from "react";


function Notifications(){


const [notifications,setNotifications] = useState([]);



useEffect(()=>{


const data = JSON.parse(

localStorage.getItem("riskNotifications") || "[]"

);


setNotifications(data);


},[]);





const clearNotifications = ()=>{


localStorage.removeItem("riskNotifications");


setNotifications([]);


};






return(


<div

className="
min-h-screen
p-8
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

🚨 AI Risk Alerts

</h1>




<p className="text-gray-300 mt-2">

AI generated risk notifications history

</p>






<div className="mt-8">


{

notifications.length === 0

?


<div

className="
bg-white/10
rounded-3xl
p-8
text-gray-300
"

>

No new alerts available

</div>


:


<>

<button

onClick={clearNotifications}

className="
bg-red-500/20
border
border-red-400/40
text-red-400
px-5
py-2
rounded-xl
mb-6
"

>

🗑 Clear All Alerts

</button>





<div

className="
grid
grid-cols-1
gap-5
"

>


{

notifications.map((item,index)=>(


<div

key={index}

className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-6
border
border-white/10
"

>


<h2 className="
text-xl
font-bold
text-red-400
">

{item.message}

</h2>



<p className="mt-3">

Risk Score:

<span className="text-cyan-400">

 {item.score}%

</span>

</p>




<p className="mt-2">

Status:

{item.status}

</p>




<p className="mt-3 text-gray-400">

🕒 {item.time}

</p>



</div>


))


}


</div>


</>


}


</div>





</div>


);


}


export default Notifications;