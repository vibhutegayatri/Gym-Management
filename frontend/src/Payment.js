

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     product: "",
//     amount: "",
//     trainer: "",
//     duration: 1, // Number of months
//   });
//   const [showQR, setShowQR] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const plan = location.state?.workout || JSON.parse(localStorage.getItem("buyNow"));
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (plan) {
//       setForm((prev) => ({
//         ...prev,
//         product: plan.name,
//         amount: plan.price.replace("₹", ""),
//         trainer: plan.trainer?.name || plan.trainer || "Not Assigned",
//         duration: plan.duration ? parseInt(plan.duration) : 1, // fix: number
//       }));
//       localStorage.setItem("buyNow", JSON.stringify(plan));
//     }

//     if (user) {
//       setForm((prev) => ({
//         ...prev,
//         name: user.name || "",
//         email: user.email || "",
//       }));
//     }
//   }, [location.state]);

//   const handleOk = async () => {
//     if (!form.name || !form.email) {
//       alert("Please enter Name and Email");
//       return;
//     }

//     setShowQR(true);

//     try {
//       await axios.post("http://localhost:5000/api/orders", {
//         name: form.name,
//         email: form.email,
//         product: form.product,
//         amount: form.amount,
//         trainer: form.trainer,
//         duration: form.duration, // send as number
//         paymentMethod: "Online (QR)",
//         paymentStatus: "Success",
//       });

//       console.log("Payment data saved successfully!");

//       setTimeout(() => {
//         setMessage("✅ Payment Successful! Thank you ❤️");
//         setTimeout(() => {
//           navigate("/main");
//         }, 3000);
//       }, 10000);
//     } catch (err) {
//       console.error("Payment failed:", err);
//       setMessage("❌ Payment Failed!");
//     }
//   };

//   const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
//     `upi://pay?pa=8010450670@axl&pn=Priya%20Pawar&am=${form.amount}&cu=INR`
//   )}`;

//   return (
//     <div style={{
//       maxWidth: 420,
//       margin: "50px auto",
//       padding: 25,
//       textAlign: "center",
//       background: "#fff",
//       borderRadius: 15,
//       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//       fontFamily: "'Poppins', sans-serif",
//     }}>
//       <h2>🛒 Checkout</h2>

//       <input name="name" value={form.name} readOnly style={{ display:"block", margin:"10px auto", width:"80%", padding:8 }} />
//       <input name="email" value={form.email} readOnly style={{ display:"block", margin:"10px auto", width:"80%", padding:8 }} />

//       <input value={form.product} readOnly style={{ display:"block", margin:"10px auto", width:"80%", padding:8 }} />
//       <input value={form.amount} readOnly style={{ display:"block", margin:"10px auto", width:"80%", padding:8 }} />
//       <input value={form.trainer} readOnly style={{ display:"block", margin:"10px auto", width:"80%", padding:8 }} />
//       <input value={`${form.duration} Month(s)`} readOnly style={{ display:"block", margin:"10px auto", width:"80%", padding:8 }} />

//       <button onClick={handleOk} style={{
//         margin:"15px auto",
//         display:"block",
//         padding:"8px 20px",
//         borderRadius: 10,
//         background: "#4CAF50",
//         color: "#fff",
//         border:"none"
//       }}>OK</button>

//       {showQR && (
//         <div style={{ marginTop: 20 }}>
//           <p>📱 Scan QR to pay ₹{form.amount}</p>
//           <img src={qrUrl} alt="QR Code" style={{ width: 200, height: 200 }} />
//         </div>
//       )}

//       <p style={{ fontWeight: "bold", marginTop: 15 }}>{message}</p>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    product: "",
    amount: "",
    trainer: "",
    duration: 1, // Number of months
  });
  const [showQR, setShowQR] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const plan = location.state?.workout || JSON.parse(localStorage.getItem("buyNow"));
    const user = JSON.parse(localStorage.getItem("user"));

    if (plan) {
      setForm((prev) => ({
        ...prev,
        product: plan.name,
        amount: plan.price.replace("₹", ""),
        trainer: plan.trainer?.name || plan.trainer || "Not Assigned",
        duration: plan.duration ? parseInt(plan.duration) : 1,
      }));
      localStorage.setItem("buyNow", JSON.stringify(plan));
    }

    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [location.state]);

  const handleOk = async () => {
    if (!form.name || !form.email) {
      alert("Please enter Name and Email");
      return;
    }

    setShowQR(true);

    try {
      await axios.post("https://gymmanagment-75up.onrender.com/api/users/orders", {
        name: form.name,
        email: form.email,
        product: form.product,
        amount: form.amount,
        trainer: form.trainer,
        duration: form.duration,
        paymentMethod: "Online (QR)",
        paymentStatus: "Success",
      });

      console.log("Payment data saved successfully!");

      setTimeout(() => {
        setMessage("✅ Payment Successful! Thank you ❤️");
        setTimeout(() => {
          navigate("/main");
        }, 3000);
      }, 15000);
    } catch (err) {
      console.error("Payment failed:", err);
      setMessage("❌ Payment Failed!");
    }
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    `upi://pay?pa=8010450670@axl&pn=Priya%20Pawar&am=${form.amount}&cu=INR`
  )}`;

  return (
    <div style={{
      maxWidth: 420,
      margin: "50px auto",
      padding: 25,
      textAlign: "center",
      background: "#fff",
      borderRadius: 15,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      fontFamily: "'Poppins', sans-serif",
      position: "relative"
    }}>
      {/* Cancel Icon */}
      <span 
        onClick={() => navigate("/main")}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          cursor: "pointer",
          fontSize: 20,
          fontWeight: "bold"
        }}
      >
        ❌
      </span>

      <h2> 💵PAYMENT</h2>

      <input name="name" value={form.name} readOnly style={{ display:"block", margin:"10px auto", width:"80%", padding:8 }} />
      <input name="email" value={form.email} readOnly style={{ display:"block", margin:"10px auto", width:"80%", padding:8 }} />

      <input value={form.product} readOnly style={{ display:"block", margin:"10px auto", width:"80%", padding:8 }} />
      <input value={form.amount} readOnly style={{ display:"block", margin:"10px auto", width:"80%", padding:8 }} />
      <input value={form.trainer} readOnly style={{ display:"block", margin:"10px auto", width:"80%", padding:8 }} />
      <input value={`${form.duration} Month(s)`} readOnly style={{ display:"block", margin:"10px auto", width:"80%", padding:8 }} />

      <button onClick={handleOk} style={{
        margin:"15px auto",
        display:"block",
        padding:"8px 20px",
        borderRadius: 10,
        background: "#4CAF50",
        color: "#fff",
        border:"none"
      }}>OK</button>

      {showQR && (
        <div style={{ marginTop: 20 }}>
          <p>📱 Scan QR to pay ₹{form.amount}</p>
          <img src={qrUrl} alt="QR Code" style={{ width: 200, height: 200 }} />
        </div>
      )}

      <p style={{ fontWeight: "bold", marginTop: 15 }}>{message}</p>
    </div>
  );
}
