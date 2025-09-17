import { Box,Paper, Typography } from "@mui/material";
import ContactForm from "./ContactForm";
import { useCallback, useState } from "react";
import ContactFormSubmission from "./ContactFormSubmission";



export default function Contact() {
  
  const [form, setForm] = useState(false);
  
  const handleForm = useCallback(() => {
    setForm(!form)
  }, [form]);

  const body = "Please feel free to contact me with any questions or queries using the form below, this is linked directly to my personal " + 
  "email address using EmailJS; so whether it's  work related, feedback about the site both good or bad, bugs etc, everything is appreciated!";

 
  return (
    <Box component={Paper} sx={{p: 3}}>
      <Typography variant="h4" color="red">
        Contact
      </Typography>
      <Typography variant="subtitle1" fontSize={20} align="justify" style={{whiteSpace: 'pre-line'}} sx={{pt: 2}}>
        {body}
      </Typography>
      { form ? <ContactFormSubmission/> : <ContactForm handleForm={handleForm} form={form} />}
      

      

    </Box>
  );
}
