import { Grid2, Typography } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi";
import BasketItem from "./BasketItem";
import OrderSummary from "../../shared/components/OrderSummary";

export default function Basket() {
  const { data, isLoading } = useFetchBasketQuery();

  if (isLoading) return <Typography>Currently loading...</Typography>;

  if (!data || data.items.length === 0) return <Typography>Basket is empty...</Typography>;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8}>
        {data.items.map((item) => (
          <BasketItem item={item} key={item.productId} />
        ))}
      </Grid2>
      <Grid2 size={4}>
        <OrderSummary />
      </Grid2>
    </Grid2>
  );
}
