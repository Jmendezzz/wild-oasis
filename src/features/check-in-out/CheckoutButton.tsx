import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }: {bookingId: string | number}) {
  const {checkOut,isCheckinOut } = useCheckout();
  return (
    <Button variation="primary" size="small" disabled={isCheckinOut} onClick={()=>checkOut(bookingId)}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
