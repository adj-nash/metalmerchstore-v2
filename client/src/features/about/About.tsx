import { Paper, Typography } from "@mui/material";

export default function About() {

  const body = "Welcome to Metal Merch Store! This e-commerce store is my personal portfolio project which I have built to demonstrate " +
                "my coding abilities. It’s a full stack application that’s been built using React-Redux-Typescript for the frontend and .Net backend written in C# " +
                "while being hosted on Azure. All of the code has been written from scratch without the use of AI.\n\nI have built up my coding skills " +
                "over the past few years during the evenings & weekends while working a full time job in Finance. I've used various resources & online tutorials " +
                "to aid me along the way, these include "+"Codecademy, Udemy, Youtube, Google etc. \n\n Music is my main passion in life, in particular "+
                "metal & punk music, therefore I " +"wanted to bring this passion to the project in order to make it my own. I have photographed and listed over 50+ items " +
                "from my own personal collection of over 300+ band merch items which I have collected over the years. I’ve been inspired by " +
                "similar sites such as Impericon, EMP, Damaged Society etc.\n\n Feel free to browse each page, try out the various filters on the" + 
                " merchandise page and even sign up! Of course this website is a work in progress and I’m currently working on new features which I" +
                " intend to implement over the coming weeks.\n\n";

  return (

    

        <Paper sx={{mb: 3}}>
          <Typography sx={{p:3}} variant="h4" color="red">About</Typography>
          <Typography sx={{px:3}} variant="subtitle1" fontSize={20} align="justify" style={{whiteSpace: 'pre-line'}} >
            {body}
          </Typography>
        </Paper>

  )

}
