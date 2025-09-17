import { zodResolver } from "@hookform/resolvers/zod";
import { LockOutlined } from "@mui/icons-material";
import { Container, Paper, Box, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RegisterSchema, registerSchema } from "../../lib/schemas/registerSchema";
import { useRegisterUserMutation } from "./accountAPI";


export default function RegisterForm() {
    const {register, handleSubmit, setError, formState: {errors, isValid, isLoading}} = useForm<RegisterSchema>({
        mode: "onTouched",
        resolver: zodResolver(registerSchema)
      });
    
      const [registerUser] = useRegisterUserMutation();

      
    
      const onSubmit = async (data: RegisterSchema) => {
        try {
          await registerUser(data).unwrap();
          
        } catch (error) {
        

          const apiError = error as {message: string};
          if(apiError.message && typeof apiError.message === "string")
          {
            const errorArray = apiError.message.split(",");

            errorArray.forEach(e => {
              if(e.includes("Password"))
              {
                setError("password", {message: e})
              } else if (e.includes("Email"))
              {
                setError("email", {message: e})
              }
            })
          }
        }

    
      };
    
      return (
        <Container component={Paper} maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" marginTop={8}>
                <LockOutlined sx={{mt: 3, color: "secondary", fontSize: 40}}/>
                <Typography variant="h5" marginY={1}>Register</Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" width="100%" gap={3} marginY={3}>
                <TextField label="Email" autoFocus {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
                <TextField label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message}/>
                <Button disabled={isLoading || !isValid} variant="contained" type="submit">Sign Up</Button>
                <Typography variant="subtitle1" sx={{textAlign: "center"}}>Have an account already? <Typography component={Link} to="/login">Log in.</Typography></Typography>
                </Box>
            </Box>
        </Container>
      )
}