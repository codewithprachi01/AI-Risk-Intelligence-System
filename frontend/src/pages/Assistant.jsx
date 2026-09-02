import { useState } from "react";
import API from "../services/api";


function Assistant(){


const [message,setMessage] = useState("");

const [chat,setChat] = useState([
{
type:"bot",
text:"Hello! I am your AI Risk Assistant. Ask me anything about risk analysis."
}
]);



const sendMessage = async()=>{


if(!message.trim()) return;



const userMessage = message;



setChat(prev=>[
...prev,
{
type:"user",
text:userMessage
}
]);



setMessage("");



try{


const response = await API.post("/chat",{

message:userMessage

});



setChat(prev=>[
...prev,
{
type:"bot",
text:response.data.reply
}
]);


}

catch(error){


setChat(prev=>[
...prev,
{
type:"bot",
text:"Unable to connect with AI Assistant."
}
]);


console.log(error);


}



};



return(


<div

className="
min-h-screen
p-10
text-white
bg-linear-to-br
from-[#050816]
via-[#1b1448]
to-[#001f3f]
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

🤖 AI Risk Assistant

</h1>



<p className="text-gray-300 mt-2">

Ask anything about fraud, cyber, financial and business risks

</p>





<div

className="
mt-8
max-w-5xl
bg-white/10
backdrop-blur-xl
rounded-3xl
p-6
border
border-white/20
"

>



<div

className="
h-125
overflow-y-auto
space-y-4
"

>


{

chat.map((item,index)=>(


<div

key={index}

className={

item.type==="user"

?

"bg-purple-500/30 p-4 rounded-2xl ml-auto w-fit max-w-xl"

:

"bg-cyan-500/20 p-4 rounded-2xl w-fit max-w-xl"

}

>


{

item.type==="user"

?
"👤 "
:
"🤖 "

}


{item.text}



</div>


))


}


</div>





<div

className="
flex
gap-3
mt-5
"

>



<input


value={message}


onChange={(e)=>setMessage(e.target.value)}


onKeyDown={(e)=>{

if(e.key==="Enter")
sendMessage();

}}


className="
flex-1
p-4
rounded-xl
bg-white/10
border
border-white/20
outline-none
"

placeholder="Type your question..."


/>





<button


onClick={sendMessage}


className="
px-8
rounded-xl
bg-linear-to-r
from-cyan-500
to-purple-600
font-bold
hover:scale-105
transition
"

>

Send

</button>



</div>




</div>




</div>


);


}


export default Assistant;