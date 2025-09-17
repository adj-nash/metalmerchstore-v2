import { Box, Button, Grid2,  } from "@mui/material";
import { useForm } from "react-hook-form";
import TextInput from "../../shared/components/TextInput";
import emailjs from "@emailjs/browser";


type Props = {
    form: boolean,
    handleForm: () => void
}

type SubmitProps = {
  subject: string,
  text: string
}

export default function ContactForm({handleForm} : Props) {
  
  const {handleSubmit, control} = useForm<SubmitProps>();

  const onSubmit = (data: SubmitProps) => {
    const templateParams = {
      subject: data.subject,
      text: data.text
    }
    console.log("hello");
    

    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        });

    
    emailjs.send("metalmerchstore", "template_5pehhjc",templateParams).then((response) => {
        console.log("Success", response.status, response.text);
      },
      (error) => {
        console.log("Failed!", error);
      });

    handleForm();
    
   }


 
  return (

      <Box display="flex" justifyContent="center" sx={{p:4 }}>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <TextInput
                control={control} 
                name="subject" 
                label="Subject"/>
            </Grid2>
           <Grid2 size={12}>
              <TextInput 
                multiline 
                rows={10} 
                control={control} 
                name="text" 
                label="Text"/>
            </Grid2>
          </Grid2>
          <Box display="flex" justifyContent="center" sx={{pt: 3}}>
            <Button variant="contained" color="success" type="submit">Submit</Button>
          </Box>
        </form>
      </Box>

      
    
  );
}
