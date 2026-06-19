import { useEffect, useState } from "react";
import API from "../services/api";


function News(){


const [news,setNews] = useState([]);

const [loading,setLoading] = useState(true);



useEffect(()=>{


const loadNews = async()=>{


try{


const response = await API.get("/news-data");


setNews(response.data.news);


}

catch(error){

console.log("NEWS ERROR:",error);

}


finally{

setLoading(false);

}


};


loadNews();


},[]);





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
text-cyan-400
">

📰 News Intelligence

</h1>


<p className="
text-gray-300
mt-2
">

Real-time Risk Related News Analysis

</p>




<div className="
mt-8
grid
grid-cols-1
gap-6
">


{

loading ?

<div className="
bg-white/10
p-6
rounded-3xl
">

Loading latest news...

</div>



:

news.map((item,index)=>(


<div
key={index}
className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-6
border
border-white/20
"
>


<h2 className="
text-xl
font-bold
text-cyan-300
">

{item.title}

</h2>



<p className="
mt-3
text-gray-300
">

{item.description}

</p>



<div className="
mt-4
flex
justify-between
">


<span className="
text-purple-300
">

Source:
{item.source}

</span>



<span className="
text-green-400
font-bold
">

LIVE

</span>


</div>


</div>


))


}



</div>



</div>

);


}


export default News;