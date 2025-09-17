import {
  Box,
  Typography,
  Divider,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import currencyFormat from "../../lib/util";
import { useFetchBasketQuery } from "../../features/basket/basketApi";
import { Link, useLocation } from "react-router-dom";

export default function OrderSummary() {
  const { data } = useFetchBasketQuery();

  const subtotal =
    data?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;
  const location = useLocation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth="lg"
      mx="auto"
    >
      <Paper sx={{ mb: 2, p: 3, width: "100%" }}>
        <Typography variant="subtitle1" fontSize={23} component="p" fontWeight="bold">
          Order Summary
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          Orders over £100 qualify for free delivery!
        </Typography>
        <Box mt={2}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="subtitle1">Subtotal</Typography>
            <Typography variant="subtitle1">{currencyFormat(subtotal)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="subtitle1">Discount</Typography>
            <Typography color="success">
              {/* TODO */}
              -$0.00
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="subtitle1">Postage</Typography>
            <Typography variant="subtitle1">{currencyFormat(deliveryFee)}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="subtitle1">Total</Typography>
            <Typography variant="subtitle1">{currencyFormat(subtotal + deliveryFee)}</Typography>
          </Box>  
        </Box>

        <Box mt={2}>
          {!location.pathname.includes("checkout") &&
          <Button component={Link} to="/checkout" variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>
            Checkout
          </Button>
}
          <Button fullWidth variant="contained" component={Link} to="/merchandise">Continue Shopping</Button>
        </Box>
      </Paper>

      {/* Coupon Code Section */}
      <Paper sx={{ width: "100%", p: 3, pb:2 }}>
        <form>
          <Typography variant="subtitle1" component="label">
            Do you have a voucher code?
          </Typography>

          <TextField
            label="Voucher code"
            variant="outlined"
            fullWidth
            sx={{ my: 2 }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Apply code
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
