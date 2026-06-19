import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import RiskAnalyzer from "./pages/RiskAnalyzer";
import Health from "./pages/Health";
import Weather from "./pages/Weather";
import News from "./pages/News";
import Assistant from "./pages/Assistant";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";

import ProtectedRoute from "./auth/ProtectedRoute";



function App(){


return(

<BrowserRouter>


<Routes>



<Route

path="/"

element={<Login />}

/>



<Route

path="/register"

element={<Register />}

/>





<Route

path="/dashboard"

element={

<ProtectedRoute>

<Dashboard />

</ProtectedRoute>

}

/>



<Route

path="/risk-analyzer"

element={

<ProtectedRoute>

<RiskAnalyzer />

</ProtectedRoute>

}

/>



<Route

path="/health"

element={

<ProtectedRoute>

<Health />

</ProtectedRoute>

}

/>



<Route

path="/weather"

element={

<ProtectedRoute>

<Weather />

</ProtectedRoute>

}

/>



<Route

path="/news"

element={

<ProtectedRoute>

<News />

</ProtectedRoute>

}

/>



<Route

path="/assistant"

element={

<ProtectedRoute>

<Assistant />

</ProtectedRoute>

}

/>



<Route

path="/reports"

element={

<ProtectedRoute>

<Reports />

</ProtectedRoute>

}

/>



<Route

path="/profile"

element={

<ProtectedRoute>

<Profile />

</ProtectedRoute>

}

/>



<Route

path="/notifications"

element={

<ProtectedRoute>

<Notifications />

</ProtectedRoute>

}

/>



</Routes>


</BrowserRouter>


);


}


export default App;