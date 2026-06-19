import { useState } from "react";
import API from "../services/api";


function RiskAnalyzer(){


const [formData,setFormData] = useState({

    risk_type:"",
    main_value:"",
    previous_value:"",
    frequency:"",
    location:"",
    additional_factor:""

});


const [results,setResults] = useState([]);

const [loading,setLoading] = useState(false);

const [file,setFile] = useState(null);

const [uploadResult,setUploadResult] = useState(null);





const placeholderConfig = {


"Fraud Risk":{
main:"Enter Transaction Amount",
previous:"Enter Previous Transaction Amount",
frequency:"Enter Transaction Frequency",
location:"Enter Transaction Location",
factor:"Enter Suspicious Activity"
},


"Credit Risk":{
main:"Enter Loan Amount",
previous:"Enter Previous Credit Value",
frequency:"Enter Payment Frequency",
location:"Enter Customer Location",
factor:"Enter Credit History Factor"
},


"Market Risk":{
main:"Enter Investment Value",
previous:"Enter Previous Market Value",
frequency:"Enter Market Change Frequency",
location:"Enter Market Location",
factor:"Enter Market Factor"
},


"Cyber Security Risk":{
main:"Enter Asset/Data Value",
previous:"Enter Previous Incident Value",
frequency:"Enter Attack Frequency",
location:"Enter System Location",
factor:"Enter Security Factor"
},


"Transaction Risk":{
main:"Enter Transaction Amount",
previous:"Enter Previous Transaction",
frequency:"Enter Transaction Count",
location:"Enter Transaction Location",
factor:"Enter Transaction Factor"
},


"Identity Theft Risk":{
main:"Enter Identity Value",
previous:"Enter Previous Identity Record",
frequency:"Enter Login Frequency",
location:"Enter User Location",
factor:"Enter Identity Factor"
},


"Loan Default Risk":{
main:"Enter Loan Amount",
previous:"Enter Previous Payment",
frequency:"Enter Missed Payment Count",
location:"Enter Borrower Location",
factor:"Enter Default Factor"
},


"Insurance Claim Risk":{
main:"Enter Claim Amount",
previous:"Enter Previous Claim Amount",
frequency:"Enter Claim Frequency",
location:"Enter Claim Location",
factor:"Enter Claim Factor"
},


"Money Laundering Risk":{
main:"Enter Transfer Amount",
previous:"Enter Previous Transfer",
frequency:"Enter Transfer Frequency",
location:"Enter Transaction Location",
factor:"Enter Suspicious Pattern"
},


"Investment Risk":{
main:"Enter Investment Amount",
previous:"Enter Previous Investment",
frequency:"Enter Investment Frequency",
location:"Enter Market Location",
factor:"Enter Investment Factor"
},


"Operational Risk":{
main:"Enter Operation Value",
previous:"Enter Previous Operation Value",
frequency:"Enter Failure Frequency",
location:"Enter Operation Location",
factor:"Enter Operational Factor"
},


"Liquidity Risk":{
main:"Enter Available Amount",
previous:"Enter Previous Balance",
frequency:"Enter Cash Flow Frequency",
location:"Enter Financial Location",
factor:"Enter Liquidity Factor"
},


"Vendor Risk":{
main:"Enter Vendor Value",
previous:"Enter Previous Vendor Score",
frequency:"Enter Vendor Activity",
location:"Enter Vendor Location",
factor:"Enter Vendor Factor"
},


"Compliance Risk":{
main:"Enter Compliance Value",
previous:"Enter Previous Compliance Score",
frequency:"Enter Audit Frequency",
location:"Enter Organization Location",
factor:"Enter Compliance Factor"
},


"Customer Churn Risk":{
main:"Enter Customer Value",
previous:"Enter Previous Customer Value",
frequency:"Enter Customer Activity",
location:"Enter Customer Location",
factor:"Enter Churn Factor"
}


};




const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:e.target.value

});


};




const handlePredict = async()=>{


try{


setLoading(true);


const response = await API.post(

"/predict",

formData

);


setResults(response.data.results);
// Save Prediction History

const oldHistory = JSON.parse(
localStorage.getItem("riskHistory") || "[]"
);

const newHistory = response.data.results.map((risk)=>({

date: new Date().toLocaleDateString(),

risk: risk.risk_type,

score: risk.score,

status: risk.status

}));

localStorage.setItem(

"riskHistory",

JSON.stringify([

...newHistory,

...oldHistory

])

);



// 🔔 AI Notification System
const notificationEnabled =
localStorage.getItem("notifications") !== "false";


if(notificationEnabled){


const highRisk = response.data.results.find(

(risk)=> risk.score > 70

);



if(highRisk){


// save notification history

const oldNotifications = JSON.parse(

localStorage.getItem("riskNotifications") || "[]"

);



const newNotification = {


message:

`🚨 High Risk Detected - ${highRisk.risk_type}`,


score:

highRisk.score,


status:

highRisk.status,


time:

new Date().toLocaleString()


};



localStorage.setItem(

"riskNotifications",

JSON.stringify([

newNotification,

...oldNotifications

])

);
window.dispatchEvent(
new Event("notificationUpdated")
);



// popup alert

alert(

`🚨 High Risk Detected!\n\n${highRisk.risk_type}\nRisk Score: ${highRisk.score}%`

);


}



}



}

catch(error){


console.log(error);


alert("Prediction Failed");


}



finally{


setLoading(false);


}


};






const downloadReport=()=>{


window.open(

"http://127.0.0.1:5000/download",

"_blank"

);


};




const selectedPlaceholder =

placeholderConfig[formData.risk_type]

||

{

main:"Enter Main Value",

previous:"Enter Previous Value",

frequency:"Enter Frequency",

location:"Enter Location",

factor:"Enter Additional Factor"

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


<h1 className="
text-4xl
font-bold
text-cyan-400
">

🔍 Risk Analyzer

</h1>



<p className="text-gray-300 mt-2">

AI powered 15 category risk prediction system

</p>






<div className="
mt-8
bg-white/10
backdrop-blur-xl
rounded-3xl
p-8
"

>



<h2 className="text-2xl font-bold mb-5">

Risk Analysis Form

</h2>





<select

name="risk_type"

value={formData.risk_type}

onChange={handleChange}

className="
p-3
rounded-xl
text-black
w-full
mb-5
"

>


<option value="">

Select Risk Type

</option>


{

Object.keys(placeholderConfig).map((risk)=>(

<option key={risk} value={risk}>

{risk}

</option>

))

}


</select>





<div className="
grid
grid-cols-2
gap-5
">



<input
name="main_value"
value={formData.main_value}
placeholder={selectedPlaceholder.main}
onChange={handleChange}
className="p-3 rounded-xl text-black placeholder-gray-500"
/>



<input
name="previous_value"
value={formData.previous_value}
placeholder={selectedPlaceholder.previous}
onChange={handleChange}
className="p-3 rounded-xl text-black placeholder-gray-500"
/>



<input
name="frequency"
value={formData.frequency}
placeholder={selectedPlaceholder.frequency}
onChange={handleChange}
className="p-3 rounded-xl text-black placeholder-gray-500"
/>



<input
name="location"
value={formData.location}
placeholder={selectedPlaceholder.location}
onChange={handleChange}
className="p-3 rounded-xl text-black placeholder-gray-500"
/>



<input
name="additional_factor"
value={formData.additional_factor}
placeholder={selectedPlaceholder.factor}
onChange={handleChange}
className="p-3 rounded-xl text-black placeholder-gray-500"
/>


</div>

<button

onClick={handlePredict}

disabled={loading}

className="
mt-8
px-8
py-3
rounded-xl
font-bold
bg-linear-to-r
from-cyan-400
to-blue-500
"

>

{
loading 
?
"Analyzing..."
:
"🔍 Analyze Risk"
}

</button>


<div className="
mt-8
bg-white/5
border
border-cyan-400/30
rounded-3xl
p-6
">

<h2 className="text-2xl font-bold mb-4 text-cyan-300">
📂 Upload Risk Dataset
</h2>

<p className="text-gray-300 mb-4">
Upload CSV or Excel file for bulk risk analysis
</p>


<input

type="file"

accept=".csv,.xlsx,.xls"

onChange={(e)=>setFile(e.target.files[0])}

className="
block
w-full
p-3
rounded-xl
bg-white
text-black
"

/>


<button

onClick={async()=>{


if(!file){

alert("Please select CSV or Excel file");

return;

}


const form = new FormData();

form.append("file",file);



try{


const response = await API.post(

"/upload-risk",

form,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);


setUploadResult(response.data);


alert("File Analysis Completed");


}

catch(error){

console.log(error);

alert("Upload Failed");

}


}}


className="
mt-5
px-6
py-3
rounded-xl
font-bold
bg-linear-to-r
from-green-400
to-cyan-500
"

>

🚀 Analyze Uploaded File

</button>


</div>


</div>






{

results.length>0 &&

<div className="
mt-10
grid
grid-cols-3
gap-5
">


{

results.map((risk,index)=>(


<div
key={index}
className="
bg-white/10
rounded-3xl
p-6
"
>


<h2 className="font-bold text-xl">

{risk.risk_type}

</h2>


<p className="text-5xl mt-4 text-cyan-400">

{risk.score}%

</p>


<p className="mt-3">

{risk.status}

</p>


<p className="mt-3 text-gray-300">

{risk.recommendation}

</p>

<p className="
mt-4
text-cyan-300
font-bold
">

📊 Risk Analysis:

{
risk.score >= 80
?
"Critical Risk - Immediate action recommended"

:

risk.score >= 50
?
"Moderate Risk - Continuous monitoring required"

:

"Low Risk - Situation is under control"

}

</p>






</div>


))


}


</div>

}




<button

onClick={downloadReport}

className="
mt-10
bg-purple-500
px-6
py-3
rounded-xl
font-bold
"

>

📄 Download Report

</button>




</div>


);


}


export default RiskAnalyzer;