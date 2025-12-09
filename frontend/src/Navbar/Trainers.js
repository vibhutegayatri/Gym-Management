import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Trainers() {
  const trainers = [
    {
      name: "Raghav Deshmukh",
      img: "./gym/t1.jpg",
      desc: "Certified fitness coach with 5+ years of experience helping clients reach their goals through personalized workout plans.",
      phone: "+91 98765 43210",
      email: "raghav112@gmail.com",
      experience: "5 years",
      price: "₹1500 per session",
    },
    {
      name: "Ram Jagdale",
      img: "./gym/t2.jpg",
      desc: "Certified Zumba and dance fitness instructor with a passion for fun, energetic workouts that burn calories fast.",
      phone: "+91 91234 56789",
      email: "ramjagdale22@gmail.com",
      experience: "4 years",
      price: "₹1200 per session",
    },
    {
      name: "Aisha Khan",
      img: "./gym/t3.jpg",
      desc: "Pilates and functional movement coach helping clients improve posture, mobility, and core strength.",
      phone: "+91 99887 66554",
      email: "aishakhan10@gmail.com",
      experience: "6 years",
      price: "₹1800 per session",
    },
    {
      name: "Emily Johnson",
      img: "./gym/t4.jpg",
      desc: "Yoga and mindfulness instructor specializing in stress relief, balance, and flexibility training.",
      phone: "+91 98765 12345",
      email: "johnsonemily23@gmail.com",
      experience: "5 years",
      price: "₹1400 per session",
    },
    {
      name: "Raj Patel",
      img: "./gym/t5.jpg",
      desc: "Personal trainer and nutrition expert dedicated to guiding body transformations and healthy living.",
      phone: "+91 91234 67890",
      email: "rajpatel1999@gmail.com",
      experience: "7 years",
      price: "₹1600 per session",
    },
    {
      name: "Sophia Martinez",
      img: "./gym/t6.jpg",
      desc: "Strength and conditioning specialist with a focus on athletic performance and endurance training.",
      phone: "+91 99887 11223",
      email: "sophia133@gmail.com",
      experience: "6 years",
      price: "₹1500 per session",
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [myWorkoutPlan, setMyWorkoutPlan] = useState(null);

  useEffect(() => {
    // Load the workout plan from localStorage to show which trainer has it
    const storedPlan = JSON.parse(localStorage.getItem("myWorkoutPlan"));
    if (storedPlan) setMyWorkoutPlan(storedPlan);

    const handlePlanUpdate = () => {
      const updatedPlan = JSON.parse(localStorage.getItem("myWorkoutPlan"));
      setMyWorkoutPlan(updatedPlan);
    };

    window.addEventListener("planUpdated", handlePlanUpdate);
    return () => window.removeEventListener("planUpdated", handlePlanUpdate);
  }, []);

  const handleOpen = (trainer) => {
    setSelectedTrainer(trainer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTrainer(null);
  };

  return (
    <div
      id="trainers"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "60px 20px",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#0d47a1", marginBottom: "50px" }}
      >
        Our Trainers
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {trainers.map((trainer, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                maxWidth: 345,
                textAlign: "center",
                boxShadow: 4,
                borderRadius: 4,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardMedia
                component="img"
                image={trainer.img}
                alt={trainer.name}
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "20px auto 0",
                  border: "4px solid #2196f3",
                }}
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {trainer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {trainer.desc}
                </Typography>

                {/* ✅ Show related workout plan if this trainer has it */}
                {myWorkoutPlan && myWorkoutPlan.trainer.name === trainer.name && (
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ mt: 1, fontWeight: "bold" }}
                  >
                    Added Workout: {myWorkoutPlan.name} ✅
                  </Typography>
                )}
              </CardContent>

              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpen(trainer)}
                >
                  Contact
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        {selectedTrainer && (
          <>
            <DialogTitle sx={{ m: 0, p: 2 }}>
              {selectedTrainer.name}
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent
              dividers
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <img
                src={selectedTrainer.img}
                alt={selectedTrainer.name}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #2196f3",
                  marginBottom: "10px",
                }}
              />
              <Typography variant="body1">
                <strong>Phone:</strong> {selectedTrainer.phone}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {selectedTrainer.email}
              </Typography>
              <Typography variant="body1">
                <strong>Experience:</strong> {selectedTrainer.experience}
              </Typography>
              <Typography variant="body1">
                <strong>Training Price:</strong> {selectedTrainer.price}
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
}
