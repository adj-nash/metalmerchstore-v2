import { Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useFetchOrdersQuery } from "./orderApi"
import { useNavigate } from "react-router";
import { format } from "date-fns";
import currencyFormat from "../../lib/util";

export default function OrdersPage() {

    const {data: orders, isLoading} = useFetchOrdersQuery();
    const navigate = useNavigate();
    
    if(!orders) return <Typography>No orders available.</Typography>
    
    if(isLoading) return <Typography>Loading orders...</Typography>

  return (
   <Container>
    <Typography variant="h6" align="center">My Orders</Typography>
    <Paper sx={{borderRadius: 3}}>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell align="center">Order</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {orders.map(order => (
            <TableRow key={order.id} hover style={{cursor: "pointer"}} onClick={() => navigate(`/orders/${order.id}`)}>
                <TableCell align="center">{order.id}</TableCell>
                <TableCell>{format(order.orderDate, "dd MMM yyyy")}</TableCell>
                <TableCell>{currencyFormat(order.total)}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
    </Paper>
   </Container>
   );
}