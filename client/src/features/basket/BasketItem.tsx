import { Box, Grid2, IconButton, Paper, Typography } from "@mui/material";
import { Item } from "../../app/models/basket";
import { Add, Close, Remove } from "@mui/icons-material";
import {
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} from "./basketApi";
import currencyFormat from "../../lib/util";

export type Props = {
  item: Item;
};

export default function BasketItem({ item }: Props) {
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  return (
    <Paper
      sx={{
        height: 140,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          src={item.imageUrl}
          alt={item.name}
          sx={{
            width: 100,
            height: 100,
            objectFit: "cover", 
            mr: 8,
            ml: 4,
          }}
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="subtitle1">{item.name}</Typography>
          <Box display="flex" alignItems="center" gap={3}>
            <Typography sx={{ fontSize: "1rem", color: "#BDBDBD" }}>
              {currencyFormat(item.price)}
            </Typography>
          </Box>
          <Grid2 container spacing={1} alignItems="center">
            <IconButton
              onClick={() =>
                removeBasketItem({ productId: item.productId, quantity: 1 })
              }
              color="error"
              size="small"
            >
              <Remove />
            </IconButton>
            <Typography sx={{color: "#BDBDBD"}}>{item.quantity}</Typography>
            <IconButton
              onClick={() => addBasketItem({ product: item, quantity: 1 })}
              color="success"
              size="small"
            >
              <Add />
            </IconButton>
          </Grid2>
        </Box>
      </Box>
      <IconButton color="error" size="small" sx={{ alignSelf: "start" }}>
        <Close />
      </IconButton>
    </Paper>
  );
}
