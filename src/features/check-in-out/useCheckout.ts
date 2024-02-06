import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckout() {
    const queryClient = useQueryClient();
  const { mutate: checkOut, isPending: isCheckinOut } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} succesfully checked out`);
      queryClient.invalidateQueries({
        queryKey:['bookings']
      })

    },
    onError: () => {
      toast.error('There was an error checking out.');
    },
  });


  return {checkOut, isCheckinOut}
}
