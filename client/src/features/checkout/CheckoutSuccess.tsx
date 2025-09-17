import { useLocation } from "react-router-dom";
import { Order } from "../../app/models/order";
import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import currencyFormat, { addressString, paymentString } from "../../lib/util";

export default function CheckoutSuccess() {
  const {state} = useLocation();
  const order = state.data as Order;

  console.log(order);

  if(!order) return <Typography>There was a problem accessing the order.</Typography>

 
  return (
    <Container maxWidth="md">
      <>
      <Typography variant="h4" gutterBottom>
        Thank you for your order!
      </Typography>
      <Typography variant="h4" gutterBottom>
        Your order number {order.id} is now being processed. 
      </Typography>

      <Paper elevation={1} sx={{display: "flex", flexDirection: "column"}}>
        <Box display="flex" justifyContent="space-between">
        <Typography>
            Order Date
          </Typography>
          <Typography>
            {order.orderDate}
          </Typography>
        </Box>
        <Divider/>
        <Box display="flex" justifyContent="space-between">
        <Typography>
            Payment Method
          </Typography>
          <Typography>
            {paymentString(order.paymentSummary)}
          </Typography>
        </Box>
        <Divider/>
        <Box display="flex" justifyContent="space-between">
        <Typography>
            Shipping Address
          </Typography>
          <Typography>
            {addressString(order.shippingAddress)}
          </Typography>
        </Box>
        <Divider/>
        <Box display="flex" justifyContent="space-between">
        <Typography>
            Amount
          </Typography>
          <Typography>
            {currencyFormat(order.total)}
          </Typography>
        </Box>
      </Paper>
      </>
    </Container>
  )
};