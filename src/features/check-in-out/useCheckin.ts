import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UpdateBooking } from '../../interfaces/Booking';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckinIn } = useMutation({
    mutationFn: (booking: UpdateBooking) =>
      updateBooking(booking.id, {
        ...booking
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} succesfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError:() => toast.error('There was an error while checking in.')
  });
  return {checkin,isCheckinIn};
}
