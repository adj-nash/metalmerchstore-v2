import { Card, Box, Typography, Button, Divider, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useFetchOrderQuery } from "./orderApi";
import { Link, useParams } from "react-router-dom";
import currencyFormat, { addressString, paymentString } from "../../lib/util";
import { format } from "date-fns";

export default function OrderDetails() {

    const {id} = useParams();
    const {data: order, isLoading} = useFetchOrderQuery(+id!);

    if(isLoading) return <Typography>Loading order details...</Typography>

    if(!order) return <Typography>There was a problem fetching order details.</Typography>

  return (
   
    <Card sx={{p: 2, maxWidth: "md", mx:"auto"}}>
        <Box display="flex" justifyContent="space-between" alignItems="center" >
            <Typography>Summary of order #{order.id} </Typography>
            <Button component={Link} to="/orders">Back to Orders</Button>
        </Box>
        <Divider/>
        <Box>
            <Typography variant="h6">Billing & Delivery Information</Typography>
            <Box component="dl">
              <Typography component="dt" variant="subtitle1">Shipping Address</Typography>
              <Typography component="dd" variant="body2">{addressString(order.shippingAddress)}</Typography>
            </Box>
            <Box component="dl">
              <Typography component="dt" variant="subtitle1">Payment Information</Typography>
              <Typography component="dd" variant="body2">{paymentString(order.paymentSummary)}</Typography>
            </Box>
        </Box>
        <Divider sx={{my:2}}/>
        <Box>
          <Typography variant="h6">Order Details</Typography>
          <Box component="dl">
              <Typography component="dt" variant="subtitle1">Email Address</Typography>
              <Typography component="dd" variant="body2">{order.buyerEmail}</Typography>
            </Box>
            <Box component="dl">
              <Typography component="dt" variant="subtitle1">Order Status</Typography>
              <Typography component="dd" variant="body2">{order.orderStatus}</Typography>
            </Box>
          <Box component="dl">
              <Typography component="dt" variant="subtitle1">Order Date</Typography>
              <Typography component="dd" variant="body2">{order.buyerEmail}</Typography>
            </Box>
            <Box component="dl">
              <Typography component="dt" variant="subtitle1">Order Status</Typography>
              <Typography component="dd" variant="body2">{format(order.orderDate, "dd MMM yyyy")}</Typography>
            </Box>
        </Box>
        <Divider sx={{my:2}}/>
         <Box>
                    
                    <Table>
                        <TableBody>
                            {order.orderItems.map((item) => (
                                <TableRow key={item.productId}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={3}>
                                        <img src={item.pictureUrl} alt={item.name} style={{width: 150, height: 150}}></img>
                                        <Typography>{item.name}..</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {item.quantity}
                                    </TableCell>    
                                    <TableCell>
                                        {currencyFormat(item.price * item.quantity) }
                                        </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
        
                </Box>
            <Box mr={6}>
                  <Box component="dl" display="flex" justifyContent="space-between">
                  <Typography component="dt" variant="subtitle1">Subtotal</Typography>
                  <Typography component="dd" variant="body2">{currencyFormat(order.subtotal)}</Typography>
            </Box>
            <Box component="dl" display="flex" justifyContent="space-between">
              <Typography component="dt" variant="subtitle1">Discount</Typography>
              <Typography component="dd" variant="body2">{currencyFormat(order.discount)}</Typography>
            </Box>
            <Box component="dl" display="flex" justifyContent="space-between">
              <Typography component="dt" variant="subtitle1">Delivery Fee</Typography>
              <Typography component="dd" variant="body2">{currencyFormat(order.deliveryFee)}</Typography>
            </Box>
            <Box component="dl" display="flex" justifyContent="space-between">
              <Typography component="dt" variant="subtitle1">Total</Typography>
              <Typography component="dd" variant="body2">{currencyFormat(order.total)}</Typography>
            </Box>
    
    
      </Box>
    </Card>
  )
}