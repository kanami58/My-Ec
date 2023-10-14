import { CartItem } from "../types";

type Props = {
  cartItems: CartItem[];
};

function SubTotal(props: Props) {
  let subtotal = 0;
  props.cartItems.forEach(cartItem => {
    subtotal = subtotal + cartItem.price * cartItem.count
  });
  return <>合計: {subtotal}円</>;
}

export default SubTotal;
