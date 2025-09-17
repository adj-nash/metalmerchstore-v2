import { Box, Divider, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useFetchBasketQuery } from "../basket/basketApi";
import currencyFormat from "../../lib/util";
import { ConfirmationToken } from "@stripe/stripe-js";

export type Props = {
    confirmationToken: ConfirmationToken | null;
}

export default function Review({confirmationToken}: Props) {
    const {data: basket} = useFetchBasketQuery();
    
    const addressString = () => {
        if(!confirmationToken?.shipping) return "";
        const {name, address} = confirmationToken.shipping;
        return `${name},
        ${address?.line1},
        ${address?.line2},
        ${address?.city},
        ${address?.state},
        ${address?.country},
        ${address?.postal_code}`
        };

    const paymentString = () => {
        if(!confirmationToken?.payment_method_preview.card) return "";
        const {card} = confirmationToken.payment_method_preview;
        return `${card.brand.toUpperCase()}, **** **** **** ${card.last4}\nExp: ${card.exp_month}/${card.exp_year}`
    };    


  return (
    <div>
        <Typography>Billing & Delivery Information</Typography>
        <dl>
            <Typography component="dt">
                Shipping Address
            </Typography>
            <Typography component="dd">
                {addressString()}
            </Typography>
            <Typography component="dt">
                Payment Information
            </Typography>
            <Typography component="dd">
                {paymentString()}
            </Typography>
        </dl>
        <Box>
            <Divider/>
            <Table>
                <TableBody>
                    {basket?.items.map((item) => (
                        <TableRow key={item.productId}>
                            <TableCell>
                                <Box display="flex" alignItems="center" gap={3}>
                                <img src={item.imageUrl} alt={item.name} style={{width: 150, height: 150}}></img>
                                <Typography>{item.name}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                {item.quantity}
                            </TableCell>    
                            <TableCell>
                                {currencyFormat(item.price)}
                                </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </Box>
    </div>
  )
}