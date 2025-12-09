// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./Navbar/Index";
// import MainSite from "./Navbar/MainSite";
// import Payment from "./Payment"; // ✅ added


// import "./App.css";
// import MainPage from "./Navbar/MainPage";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           {/* Start / Landing Page */}
//           <Route path="/" element={<Index />} />

//           {/* Main website (Header, Home, WorkoutPlans, etc.) */}
//           <Route path="/main" element={<MainSite />} />

//           {/* ✅ New: Payment page (opens when Add is clicked) */}
//           <Route path="/payment" element={<Payment />} />

          

//           {/* ✅ Optional: Profile page (shows purchased plan) */}
//          {/* <Route path="/profile" element={<Profile />} /> */}
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Navbar/Index";
import MainSite from "./Navbar/MainSite";
import Payment from "./Payment";
import AdminLogin from "./Navbar/admin/AdminLogin";   // ✅ Add this
import AdminPanel from "./Navbar/admin/AdminPanel";   // ✅ Add this

import "./App.css";
import MainPage from "./Navbar/MainPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Start / Landing Page */}
          <Route path="/" element={<Index />} />

          {/* Main website (Header, Home, WorkoutPlans, etc.) */}
          <Route path="/main" element={<MainSite />} />

          {/* ✅ Payment page */}
          <Route path="/payment" element={<Payment />} />

          {/* ✅ Admin routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<AdminPanel />} />

          {/* Optional future routes */}
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
