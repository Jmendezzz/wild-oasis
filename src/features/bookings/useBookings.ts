import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue == 'all'
      ? null
      : { field: 'status', value: filterValue };
  //Query key uses a dependency array too like useEffect.
  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['bookings', filter],
    queryFn: () => getBookings({ filter }),
  });

  return { bookings, error, isLoading };
}
