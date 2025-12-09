



import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Container,
  Box,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function WorkoutPlans() {
  const navigate = useNavigate();

  const workouts = [
    {
      id: 1,
      name: "Full Body Workout",
      duration: "3 Months",
      time: "Morning — 7:00 AM to 8:00 AM",
      level: "Intermediate",
      trainer: { name: "Raghav Deshmukh", email: "raghav112@gmail.com", phone: "+91 98765 43210" },
      price: "₹1",
      description: "A complete workout targeting all major muscle groups for balanced strength and endurance.",
      focus: "Arms, Legs, Core, Shoulders",
    },
    {
      id: 2,
      name: "Cardio Blast",
      duration: "2 Months",
      time: "Evening — 6:00 PM to 6:45 PM",
      level: "Beginner",
      trainer: { name: "Ram Jagdale", email: "ramjagdale22@gmail.com", phone: "+91 91234 56789" },
      price: "₹1",
      description: "High-intensity cardio plan designed to burn calories and improve stamina.",
      focus: "Heart health, Weight loss",
    },
    {
      id: 3,
      name: "Strength Training",
      duration: "4 Months",
      time: "Morning — 8:00 AM to 9:00 AM",
      level: "Advanced",
      trainer: { name: "Sophia Martinez", email: "sophia133@gmail.com", phone: "+91 99887 11223" },
      price: "₹1",
      description: "Build muscle strength with resistance and weight-based exercises.",
      focus: "Chest, Back, Arms, Legs",
    },
    {
      id: 4,
      name: "Yoga & Flexibility",
      duration: "3 Months",
      time: "Morning — 6:00 AM to 7:00 AM",
      level: "All Levels",
      trainer: { name: "Emily Johnson", email: "johnsonemily23@gmail.com", phone: "+91 98765 12345" },
      price: "₹1",
      description: "Relax your mind and body while improving flexibility and balance.",
      focus: "Flexibility, Stress relief",
    },
    {
      id: 5,
      name: "Core Crusher",
      duration: "2 Months",
      time: "Evening — 7:00 PM to 7:45 PM",
      level: "Intermediate",
      trainer: { name: "Aisha Khan", email: "aishakhan10@gmail.com", phone: "+91 99887 66554" },
      price: "₹1",
      description: "Strengthen your abs and obliques with focused core movements.",
      focus: "Abs, Core strength",
    },
    {
      id: 6,
      name: "HIIT Power",
      duration: "1 Month",
      time: "Morning — 9:00 AM to 9:30 AM",
      level: "Advanced",
      trainer: { name: "Raj Patel", email: "rajpatel1999@gmail.com", phone: "+91 91234 67890" },
      price: "₹1",
      description: "Short, powerful bursts of exercise followed by rest for maximum fat burn.",
      focus: "Fat burn, Endurance",
    },
    {
      id: 7,
      name: "Lower Body Burn",
      duration: "3 Months",
      time: "Evening — 5:00 PM to 6:00 PM",
      level: "Intermediate",
      trainer: { name: "Ram Jagdale", email: "ramjagdale22@gmail.com", phone: "+91 91234 56789" },
      price: "₹1",
      description: "Tone and strengthen your legs and glutes with powerful lower body exercises.",
      focus: "Legs, Glutes",
    },
    {
      id: 8,
      name: "Upper Body Sculpt",
      duration: "3 Months",
      time: "Morning — 7:30 AM to 8:30 AM",
      level: "Intermediate",
      trainer: { name: "Raghav Deshmukh", email: "raghav112@gmail.com", phone: "+91 98765 43210" },
      price: "₹1",
      description: "Focus on your chest, shoulders, and arms to build a strong upper body.",
      focus: "Arms, Chest, Shoulders",
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showAlreadyPopup, setShowAlreadyPopup] = useState(false);
  const [pendingWorkout, setPendingWorkout] = useState(null);
  const [existingPlans, setExistingPlans] = useState([]);

  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const handleOpen = (workout) => { setSelectedWorkout(workout); setOpen(true); };
  const handleClose = () => { setOpen(false); setSelectedWorkout(null); };

  const handleAddPlan = async (workout) => {
    if (!parsedUser) { alert("Please login first!"); return; }

    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${parsedUser.email}`);
      const userOrders = response.data || [];

      if (userOrders.length > 0) {
        setPendingWorkout(workout);
        setExistingPlans(userOrders);
        setShowAlreadyPopup(true);
      } else {
        navigate("/payment", { state: { workout } });
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
      navigate("/payment", { state: { workout } });
    }
  };

  const handleConfirmYes = () => { setShowAlreadyPopup(false); if (pendingWorkout) { navigate("/payment", { state: { workout: pendingWorkout } }); setPendingWorkout(null); } };
  const handleConfirmNo = () => { setShowAlreadyPopup(false); setPendingWorkout(null); };

  return (
    <div style={{ width: "100%", backgroundColor: "#f3f4f6", padding: "90px 0" }}>
      <Container>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#0d47a1", marginBottom: "50px" }}>Workout Plans</Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px", justifyItems: "center", width: "100%", maxWidth: "1200px" }}>
            {workouts.map((workout) => (
              <Card key={workout.id} sx={{ width: "100%", maxWidth: 250, textAlign: "center", boxShadow: 4, borderRadius: 4, padding: 2, transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                <CardContent><Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold", color: "black" }}>{workout.name}</Typography></CardContent>
                <CardActions sx={{ display: "flex", flexDirection: "column", justifyContent: "center", pb: 1, gap: 1 }}>
                  <Button variant="contained" color="primary" onClick={() => handleOpen(workout)}>View Details</Button>
                  <Button variant="contained" color="primary" onClick={() => handleAddPlan(workout)}>Add</Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      </Container>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        {selectedWorkout && (
          <>
            <DialogTitle sx={{ m: 0, p: 2 }}>
              {selectedWorkout.name}
              <IconButton aria-label="close" onClick={handleClose} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
              <Typography variant="body1"><strong>Duration:</strong> {selectedWorkout.duration}</Typography>
              <Typography variant="body1"><strong>Time:</strong> {selectedWorkout.time}</Typography>
              <Typography variant="body1"><strong>Level:</strong> {selectedWorkout.level}</Typography>
              <Typography variant="body1"><strong>Trainer:</strong> {selectedWorkout.trainer.name} ({selectedWorkout.trainer.email}, {selectedWorkout.trainer.phone})</Typography>
              <Typography variant="body1"><strong>Price:</strong> {selectedWorkout.price}</Typography>
              <Typography variant="body1"><strong>Focus:</strong> {selectedWorkout.focus}</Typography>
              <Typography variant="body1" sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}>{selectedWorkout.description}</Typography>
            </DialogContent>
          </>
        )}
      </Dialog>

      <Modal open={showAlreadyPopup} onClose={handleConfirmNo}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "white", width: 350, borderRadius: 3, boxShadow: 24, p: 4, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>You already selected a plan</Typography>
          {existingPlans.length > 0 && (
            <Box sx={{ mb: 2, textAlign: "left" }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>Your existing plans:</Typography>
              {existingPlans.map((order) => (<Typography key={order._id} variant="body2">- {order.product}</Typography>))}
            </Box>
          )}
          <Typography variant="body1" sx={{ mb: 3 }}>Do you want to buy one more plan?</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" color="success" onClick={handleConfirmYes}>Yes</Button>
            <Button variant="outlined" color="error" onClick={handleConfirmNo}>No</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
