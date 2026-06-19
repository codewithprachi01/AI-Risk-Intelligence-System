import { Link } from "react-router-dom";
import { useState } from "react";


function Sidebar(){


const logout = ()=>{

    localStorage.removeItem("token");

    window.location.href="/";

};



const [darkMode,setDarkMode] = useState(
localStorage.getItem("darkMode") === "true"
);



const [notifications,setNotifications] = useState(
localStorage.getItem("notifications") !== "false"
);



const toggleDarkMode = ()=>{


const value = !darkMode;


setDarkMode(value);


localStorage.setItem(
"darkMode",
value
);


};



const toggleNotifications = ()=>{


const value = !notifications;


setNotifications(value);


localStorage.setItem(
"notifications",
value
);


};





return(


<div

className="
w-64
min-h-screen
bg-[#0B1220]
border-r
border-white/10
p-6
text-white
"

>



<h1

className="
text-xl
font-bold
mb-10
"

>

AI Risk

<span className="text-cyan-400">

 AI

</span>

</h1>





<div

className="
space-y-5
text-gray-300
"

>



<Link
to="/dashboard"
className="
block
hover:text-cyan-400
transition
"
>

🏠 Dashboard

</Link>





<Link
to="/risk-analyzer"
className="
block
hover:text-cyan-400
transition
"
>

🔍 Risk Analyzer

</Link>





<Link
to="/health"
className="
block
hover:text-cyan-400
transition
"
>

🩺 Health Intelligence

</Link>





<Link
to="/weather"
className="
block
hover:text-cyan-400
transition
"
>

🌦️ Weather & Climate

</Link>





<Link
to="/news"
className="
block
hover:text-cyan-400
transition
"
>

📰 News Intelligence

</Link>





<Link
to="/assistant"
className="
block
hover:text-cyan-400
transition
"
>

🤖 AI Assistant

</Link>





<Link
to="/reports"
className="
block
hover:text-cyan-400
transition
"
>

📄 Reports

</Link>





<Link
to="/profile"
className="
block
hover:text-cyan-400
transition
"
>

👤 Profile

</Link>





<div

className="
mt-8
border-t
border-white/10
pt-5
"

>


<h2 className="text-gray-400 mb-4">

⚙️ Settings

</h2>




<p

onClick={toggleDarkMode}

className="
cursor-pointer
hover:text-cyan-400
transition
"

>

🌙 Dark Mode:

<span className="text-cyan-400">

 {darkMode ? " ON" : " OFF"}

</span>

</p>





<p

onClick={toggleNotifications}

className="
cursor-pointer
hover:text-cyan-400
transition
mt-4
"

>

🔔 AI Notifications:

<span className="text-cyan-400">

 {notifications ? " ON" : " OFF"}

</span>

</p>





<Link

to="/notifications"

className="
block
mt-4
hover:text-cyan-400
transition
"

>

🚨 Alerts

</Link>



</div>







<p

onClick={logout}

className="
hover:text-red-400
cursor-pointer
transition
mt-8
"

>

🚪 Logout

</p>





</div>


</div>


);


}


export default Sidebar;