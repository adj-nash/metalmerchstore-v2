import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function RegistrationSuccess() {
  return (
    <Typography sx={{textAlign: "center"}}>You have successfully registered! Click <Typography component={Link} to="/login">Here</Typography> to login.</Typography>
  )
}