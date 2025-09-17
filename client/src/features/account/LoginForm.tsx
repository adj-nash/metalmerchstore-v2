import { LockOutlined } from "@mui/icons-material";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginSchema, LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyUserInfoQuery, useLoginMutation} from "./accountAPI";

export default function LoginForm() {
  const [fetchUserInfo] = useLazyUserInfoQuery();
  const {register, handleSubmit, formState: {errors}} = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema)
  });

  const [login, {isLoading}] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data: LoginSchema) => {
    await login(data);
    await fetchUserInfo();
    console.log(location.state?.from);
    navigate(location.state?.from || "/merchandise");

  };

  return (
    <Container component={Paper} maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" marginTop={8}>
            <LockOutlined sx={{mt: 3, color: "secondary", fontSize: 40}}/>
            <Typography variant="h5" marginY={1}>Sign In</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" width="100%" gap={3} marginY={3}>
            <TextField label="Email" autoFocus {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
            <TextField label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message}/>
            <Button disabled={isLoading} variant="contained" type="submit">Sign In</Button>
            <Typography variant="subtitle1" sx={{textAlign: "center"}}>Don't have an account? <Typography variant="subtitle1" component={Link} to="/register">Sign up.</Typography></Typography>
            </Box>
        </Box>
    </Container>
  )
}