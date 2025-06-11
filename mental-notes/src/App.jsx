import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Alert,
  Fade,
} from "@mui/material";

const styles = {
 container: (theme) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2px dashed red",
    fontFamily: '"Poppins", sans-serif',
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "20px", // fix overflow on small screens
      paddingRight: "20px",
    },
  }),
  gridContainer: (theme) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    border: "2px dashed blue",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }),
  paper: (theme) => ({
    padding: "25px",
    borderRadius: "15px",
    border: "2px dashed black",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
    backgroundColor: "white",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    animation: "fadeIn 0.8s ease-in-out",
    "@keyframes fadeIn": {
      from: { opacity: 0, transform: "translateY(-10px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    [theme.breakpoints.down("sm")]: {
      padding: "20px 15px",
      maxWidth: "100%",
    },
  }),
  notesContainer: (theme) => ({
    marginTop: "24px",
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#fff3cd",
    borderRadius: "10px",
    padding: "16px",
  }),
  mentalSpaceWrapper: (theme) => ({
    display: "flex",
    justifyContent: "center",
    marginTop: "32px",
  }),
  mentalSpaceGrid: (theme) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",   // ✅ center items horizontally
    alignItems: "center",    
    gap: "2px",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
    flexDirection: "column",  // ✅ stack vertically on small screens if needed
    alignItems: "center",
  },
  }),
  postButton: {
    marginTop: "12px",
  },
};

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const createNote = (e) => {
    e.preventDefault();
    if (title && content) {
      const newNote = {
        id: Date.now(),
        title,
        content,
      };
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
      setSuccessMessage("Note posted!");
      setTimeout(() => setSuccessMessage(""), 2000);
    }
  };

  return (
    <Container sx={styles.container}>
      <Grid container spacing={30} sx={styles.gridContainer}>
        {/* Left Section */}
        <Grid>
          <Paper sx={styles.paper}>
            <Typography variant="h5" gutterBottom>
              Share Your Journey
            </Typography>
            <form onSubmit={createNote}>
              <TextField
                fullWidth
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Write your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                margin="normal"
              />
              <Button type="submit" variant="contained" fullWidth sx={styles.postButton}>
                Post
              </Button>
            </form>
            {successMessage && (
              <Fade in={!!successMessage} timeout={300}>
                <Alert severity="success" sx={{ mt: 2 }}>
                  {successMessage}
                </Alert>
              </Fade>
            )}
          </Paper>

          {/* Notes Section */}
          <Box sx={styles.notesContainer}>
            <Typography variant="h6">Notes</Typography>
            {notes.map((note) => (
              <Box key={note.id} sx={{ mt: 2, padding: 1, background: "#fff", borderRadius: 1 }}>
                <Typography fontWeight="bold">{note.title}</Typography>
                <Typography>{note.content}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={4}>
          <Box sx={styles.mentalSpaceWrapper}>
            <Box sx={styles.mentalSpaceGrid}>
              <Button variant="contained">Mind</Button>
              <Button variant="contained" color="warning">
                Body
              </Button>
              <Button variant="contained" color="success">
                Boost
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
