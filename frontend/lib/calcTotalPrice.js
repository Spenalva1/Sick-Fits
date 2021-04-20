const calcTotalPrice = (cart) =>
  cart.reduce((prev, { quantity, product }) => {
    if (!product) return prev; // products can be delete, but they could still be in your cart
    return prev + quantity * product.price;
  }, 0);

export default calcTotalPrice;
