import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import { useFetchProductQuery } from "./merchandiseAPI";
import {
  useAddBasketItemMutation,
  useFetchBasketQuery,
  useRemoveBasketItemMutation,
} from "../basket/basketApi";
import { ChangeEvent, useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: basket } = useFetchBasketQuery();
  const [addBasketItem] = useAddBasketItemMutation();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const item = basket?.items.find((x) => x.productId === +id!);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
  }, [item]);

  const { data: product, isLoading } = useFetchProductQuery(id ? +id : 0);

  if (isLoading || !product) return <div>Loading...</div>;

  const handleUpdateBasket = () => {
    const updatedQuantity = item
      ? Math.abs(quantity - item.quantity)
      : quantity;
    if (!item || quantity > item.quantity) {
      addBasketItem({ product, quantity: updatedQuantity });
    } else {
      removeBasketItem({
        productId: product.id,
        quantity: updatedQuantity,
      });
    }
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.currentTarget.value;
    if (value >= 0) setQuantity(value);
  };

  const productFields = [
    { label: "", value: product.description },
    { label: "Band", value: product.band },
    { label: "Genre", value: product.genre },
  ];


  return (
    <Grid container spacing={3} sx={{ m: "85px" }}>
      <Grid size={2}></Grid>
      <Grid size={5}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid size={5}>
        <Typography variant="subtitle1" sx={{fontSize: "35px"}}>{product.name}</Typography>

        <Typography variant="subtitle1" sx={{ mb: 1, fontSize: "20px"}}>
          £{(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="subtitle1">Inc. VAT plus shipping</Typography>
        <Grid size={4}>
          <TextField
            sx={{ marginTop: "20px", width: "210px" }}
            variant="outlined"
            type="number"
            label="Quantity in Basket"
            value={quantity}
            onChange={handleInputChange}
          ></TextField>
        </Grid>
        <Grid size={4}>
          <Button
            onClick={handleUpdateBasket}
            disabled={quantity === item?.quantity || (!item && quantity === 0)}
            sx={{ height: "55px", width: "210px", marginTop: "20px" }}
            color="primary"
            variant="contained"
            fullWidth
          >
            {item?.quantity ? "Update basket" : "Add to basket"}
          </Button>
        </Grid>
        <br />
        {productFields.map((item, index) => (
          <Typography sx={{p: "3px"}}variant="subtitle1" key={index}>
            <b>{item.label.toUpperCase()}</b> {item.value}
          </Typography>
        ))}

        <Grid />
      </Grid>
    </Grid>
  );
}

