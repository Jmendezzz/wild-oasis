import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Booking } from "../../interfaces/Booking";

export function useRecentStays(){
    const [searchParams] = useSearchParams();

    const numDays = searchParams.get('last') ?? 7;

    const queryDate = subDays(new Date(), Number(numDays)).toISOString();
    
    const {isLoading, data:stays} = useQuery({
        queryKey:['stays', `last-${numDays}`],
        queryFn: () => getStaysAfterDate(queryDate)
    });

    const confirmedStays = stays?.filter((s: Booking) => s.status === 'checked-in' || s.status == 'checked-out' );

    return {isLoading, stays, confirmedStays, numDays};

}