import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container } from "@mui/material";
import {
  removeCartItem,
  setCartItems,
  clearCart,
} from "../../AppRedux/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const cartItems = useSelector((state) => state.cartItems?.cartItems);
  // remove item from cart
  const handleRemoveItem = (id) => {
    if (id === null || !id) {
      alert("No item to remove");
    }
    dispatch(removeCartItem(id));
  };

  // handle clear cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        Your cart is empty — Looks like you haven’t added anything yet.
      </Typography>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ padding: "2vw" }}>
      <Typography component="div" variant="h5" sx={{ fontSize: "3vw", fontWeight:"bold", mb:2 }}>
        Items in Your Shopping Cart
      </Typography>
      {cartItems?.map((item) => {
        return (
          <Card
            key={item.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "2vw",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "rows",
                alignItems: "center",
                gap: 4,
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: "20%" }}
                image={item?.images && item?.images[0]}
                alt="Live from space album cover"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  width: "60%",
                }}
              >
                <CardContent sx={{ flex: "1 0 auto", padding: "0px" }}>
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ fontSize: "2vw" }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: "text.secondary", fontSize: "1vw" }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    pl: 0,
                    pb: 2,
                    pt: 2,
                  }}
                >
                  Price : ${item.price}
                </Box>
                
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Button variant="contained" color="success">
                    Place Order
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove Item
                  </Button>
                </Box>
              </Box>
            </Box>
          </Card>
        );
      })}
      <Button
        onClick={handleClearCart}
        variant="outlined"
        color="error"
        sx={{ mt: 4 }}
      >
        Do Cart Empty
      </Button>
    </Container>
  );
}
