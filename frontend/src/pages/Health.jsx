import { useState } from "react";


function Health(){


const [symptoms,setSymptoms] = useState("");

const [result,setResult] = useState(null);


const analyzeHealth = ()=>{

    let text = symptoms.toLowerCase();

    let riskPoints = 0;

let observations = [];

let suggestions = [];


const criticalConditions = [
"kidney failure",
"renal failure",
"heart attack",
"stroke",
"cancer",
"tumor",
"organ failure",
"liver failure",
"heart failure",
"paralysis"
];
criticalConditions.forEach((condition)=>{

    if(text.includes(condition)){

        riskPoints += 80;

        observations.push(
            `${condition} detected - requires medical attention`
        );

        suggestions.push(
            "Consult healthcare professional immediately"
        );

    }

});



    // Critical symptoms

    if(
        text.includes("heart attack") ||
        text.includes("chest pain") ||
        text.includes("breathing problem") ||
        text.includes("shortness of breath") ||
        text.includes("fainting")
    ){

        riskPoints += 70;

        observations.push(
            "Critical cardiac or breathing related symptoms detected"
        );

        suggestions.push(
            "Seek medical attention immediately for serious symptoms"
        );

    }



    // Previous serious history

    if(
        text.includes("previous heart attack") ||
        text.includes("heart attack history") ||
        text.includes("3 times") ||
        text.includes("multiple")
    ){

        riskPoints += 80;

        observations.push(
            "Previous serious health history detected"
        );

    }



    // Common symptoms

    if(text.includes("fever")){

        riskPoints += 15;

        observations.push(
            "Fever symptoms detected"
        );

    }


    if(text.includes("headache")){

        riskPoints += 10;

        observations.push(
            "Headache reported"
        );

    }


    if(
        text.includes("tired") ||
        text.includes("fatigue") ||
        text.includes("weakness")
    ){

        riskPoints += 15;

        observations.push(
            "Weakness or fatigue detected"
        );

    }


    if(
        text.includes("stress") ||
        text.includes("anxiety")
    ){

        riskPoints += 10;

        observations.push(
            "Stress related symptoms detected"
        );

    }



    // Health score

    let score = 100 - riskPoints;


    if(score < 5){

        score = 5;

    }



    let status;
    let risk;



    if(riskPoints >= 70){

        status =
        "High Health Risk - Immediate Attention Required";

        risk =
        "High Risk";

    }

    else if(riskPoints >= 30){

        status =
        "Moderate Health Risk - Monitoring Required";

        risk =
        "Moderate Risk";

    }

    else{

        status =
        "Good Health Condition";

        risk =
        "Low Risk";

    }



    if(suggestions.length === 0){

        suggestions=[

            "Maintain balanced diet",
            "Exercise regularly",
            "Maintain proper sleep schedule",
            "Monitor health regularly"

        ];

    }



    setResult({

        score,

        status,

        risk,

        observations:
        observations.length > 0
        ?
        observations
        :
        [
          "No major symptoms detected"
        ],


        suggestions

    });


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
bg-linear-to-r
from-green-400
to-cyan-400
text-transparent
bg-clip-text
"
>

🩺 Health Intelligence

</h1>



<p className="text-gray-300 mt-2">

AI powered wellness and symptom analysis system

</p>





<div
className="
mt-8
grid
grid-cols-2
gap-8
"
>



<div
className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-7
border
border-white/20
"
>


<h2 className="text-2xl font-bold mb-5">

Enter Health Details

</h2>



<textarea

value={symptoms}

onChange={(e)=>setSymptoms(e.target.value)}

placeholder="
Example:
fever, headache, tiredness, stress
"

className="
w-full
h-32
p-4
rounded-xl
text-black
"
/>



<button

onClick={analyzeHealth}

className="
mt-5
bg-green-500
hover:bg-green-600
px-6
py-3
rounded-xl
font-bold
"

>

Analyze Health

</button>


</div>






<div
className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-7
border
border-white/20
"
>


<h2 className="text-2xl font-bold mb-5">

AI Health Report

</h2>



{

result ?

<>


<div className="text-6xl font-bold text-green-400">

{result.score}%

</div>


<p className="mt-3 text-xl">

{result.status}

</p>


<p className="mt-2">

Risk Level:
<span className="text-cyan-400">

 {result.risk}

</span>
<div className="mt-6">

<h3 className="font-bold text-xl">
Observations
</h3>


<ul className="mt-3 space-y-2">

{
result.observations.map(
(item,index)=>(

<li key={index}>

🔎 {item}

</li>

)

)

}

</ul>


</div>

</p>




<div className="mt-6">


<h3 className="font-bold text-xl">

Suggestions

</h3>



<ul className="mt-3 space-y-2">

{

result.suggestions.map(
(item,index)=>(

<li key={index}>

✅ {item}

</li>

)

)

}

</ul>


</div>


</>


:

<p className="text-gray-300">

Enter symptoms and click analyze

</p>


}



</div>



</div>






<div
className="
mt-10
bg-yellow-500/10
border
border-yellow-400/30
rounded-2xl
p-5
"
>


<h3 className="font-bold">

⚠️ Health Disclaimer

</h3>


<p className="text-gray-300 mt-2">

This AI feature provides awareness and wellness suggestions.
It is not a medical diagnosis or replacement for a doctor.

</p>


</div>



</div>


);


}


export default Health;