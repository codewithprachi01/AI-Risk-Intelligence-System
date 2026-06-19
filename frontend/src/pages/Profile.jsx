import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Profile(){

const navigate = useNavigate();


const [darkMode,setDarkMode] = useState(
    localStorage.getItem("darkMode") !== "false"
);

const [notifications,setNotifications] = useState(
    localStorage.getItem("notifications") !== "false"
);

const [reportAlerts,setReportAlerts] = useState(
    localStorage.getItem("reportAlerts") !== "false"
);



const logout = ()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

};



// SETTINGS FUNCTIONS

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



const toggleReportAlerts = ()=>{

    const value = !reportAlerts;

    setReportAlerts(value);

    localStorage.setItem(
        "reportAlerts",
        value
    );

};





return(

<div className={`
min-h-screen
p-10
text-white
${darkMode 
?
"bg-linear-to-br from-[#050816] via-[#17153b] to-[#001f3f]"
:
"bg-gray-900"
}
`}>



<h1 className="
text-4xl
font-bold
bg-linear-to-r
from-cyan-400
to-purple-500
text-transparent
bg-clip-text
">

⚙️ User Profile

</h1>


<p className="text-gray-300 mt-2">

Manage your AI Risk System account

</p>





<div className="
mt-8
grid
grid-cols-2
gap-8
">



<div className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-8
border
border-white/20
">


<div className="
w-24
h-24
rounded-full
bg-linear-to-r
from-cyan-400
to-purple-600
flex
items-center
justify-center
text-4xl
">

👤

</div>



<h2 className="
text-2xl
font-bold
mt-5
">

Admin User

</h2>


<p className="text-gray-300">

AI Risk Analyst

</p>


<p className="mt-3 text-cyan-300">

Status : Active

</p>


</div>






<div className="
bg-white/10
rounded-3xl
p-8
">


<h2 className="
text-2xl
font-bold
mb-5
">

🔧 Settings

</h2>





<div className="space-y-5">





<button

onClick={toggleDarkMode}

className="
w-full
flex
justify-between
bg-white/5
p-4
rounded-xl
"

>


<span>

Dark Mode

</span>


<span>

{darkMode ? "🌙 ON":"☀️ OFF"}

</span>


</button>








<button

onClick={toggleNotifications}

className="
w-full
flex
justify-between
bg-white/5
p-4
rounded-xl
"

>


<span>

AI Notifications

</span>


<span>

{notifications ? "🔔 ON":"🔕 OFF"}

</span>


</button>








<button

onClick={toggleReportAlerts}

className="
w-full
flex
justify-between
bg-white/5
p-4
rounded-xl
"

>


<span>

Report Alerts

</span>


<span>

{reportAlerts ? "📄 ON":"❌ OFF"}

</span>


</button>






</div>



</div>


</div>










<div className="
mt-8
bg-white/10
rounded-3xl
p-8
">


<h2 className="
text-2xl
font-bold
mb-5
">

📌 System Information

</h2>



<div className="
space-y-3
text-gray-300
">


<p>

🚀 System: AI Multi-Risk Intelligence System

</p>


<p>

🧠 AI Engine: Risk Prediction Model

</p>


<p>

📊 Total Risk Categories: 15

</p>


<p>

🔐 Security Level: High

</p>


</div>


</div>







<button

onClick={logout}

className="
mt-8
px-8
py-3
rounded-xl
bg-red-500
hover:bg-red-600
font-bold
"

>

🚪 Logout

</button>





</div>

);


}


export default Profile;