import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid #000`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  textAlign: "center"
}));

const StyledTextField = styled(TextField)({
  width: "100%"
});

function App() {
  const [boxes, setBoxes] = useState(() => {
    const initialBoxes = [];
    for (let i = 1; i <= 50; i++) {
      initialBoxes.push({
        boxId: i,
        ticketPrice: 0, // placeholder value
        initialTickets: 0, // placeholder value
        finalTickets: 0 // placeholder value
      });
    }
    return initialBoxes;
  });
  const [currentBox, setCurrentBox] = useState(null);
  const [ticketPrice, setTicketPrice] = useState("");
  const [initialTickets, setInitialTickets] = useState("");
  const [finalTickets, setFinalTickets] = useState("");
  const [totalEarnings, setTotalEarnings] = useState(0);

  const startEditing = (box) => {
    setCurrentBox(box);
    setTicketPrice(box.ticketPrice);
    setInitialTickets(box.initialTickets);
    setFinalTickets(box.finalTickets);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedBox = {
      ...currentBox,
      ticketPrice: parseFloat(ticketPrice),
      initialTickets: parseInt(initialTickets),
      finalTickets: parseInt(finalTickets)
    };

    saveChanges(updatedBox);

    setTicketPrice("");
    setInitialTickets("");
    setFinalTickets("");
  };

  const currentDate = new Date().toLocaleDateString();

  const saveChanges = (updatedBox) => {
    const updatedBoxes = boxes.map((box) =>
      box.boxId === updatedBox.boxId ? updatedBox : box
    );
    setBoxes(updatedBoxes);
    setCurrentBox(null);
    calculateTotalEarnings(updatedBoxes);
  };

  const calculateTotalEarnings = (updatedBoxes) => {
    let earnings = 0;
    updatedBoxes.forEach((box) => {
      const soldTickets = box.initialTickets - box.finalTickets;
      earnings += box.ticketPrice * soldTickets;
    });
    setTotalEarnings(earnings);
  };

  return (
    <Box className="App">
      <Typography variant="h2" align="center" gutterBottom>
        MD Lottery Scratch Off Sales Tracker
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        Total Earnings ({currentDate}): {totalEarnings}
      </Typography>{" "}
      <Grid container>
        {boxes.map((box) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={box.boxId}>
            <StyledBox>
              <Typography variant="h5">Box ID: {box.boxId}</Typography>
              <Typography variant="body1">
                Ticket Price: {box.ticketPrice}
              </Typography>
              <Typography variant="body1">
                Initial Tickets: {box.initialTickets}
              </Typography>
              <Typography variant="body1">
                Final Tickets: {box.finalTickets}
              </Typography>
              <Typography variant="body1">
                Sold Tickets: {box.initialTickets - box.finalTickets}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => startEditing(box)}
              >
                Edit
              </Button>
            </StyledBox>
          </Grid>
        ))}
      </Grid>
      <Dialog open={!!currentBox} onClose={() => setCurrentBox(null)}>
        <DialogTitle>Edit Box {currentBox?.boxId}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              margin="dense"
              label="Ticket price"
              type="number"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
            />
            <StyledTextField
              margin="dense"
              label="Initial Tickets"
              type="number"
              value={initialTickets}
              onChange={(e) => setInitialTickets(e.target.value)}
            />
            <StyledTextField
              margin="dense"
              label="Final Tickets"
              type="number"
              value={finalTickets}
              onChange={(e) => setFinalTickets(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCurrentBox(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
