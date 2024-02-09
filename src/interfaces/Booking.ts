export interface Booking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  cabinId: number;
  guestId: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  totalPrice: number;
  status: 'unconfirmed' | 'checked-in' | 'checked-out';
  extrasPrice: number;
  cabinPrice: number;
  guests: {
    fullName: string;
    email: string;
    country: string;
    countryFlag: string;
    nationalID: string;
  };
  cabins: { name: string };
}

export interface UpdateBooking {
  id: number;
  created_at?: string;
  startDate?: string;
  endDate?: string;
  cabinId?: number;
  guestId?: number;
  hasBreakfast?: boolean;
  observations?: string;
  isPaid?: boolean;
  numGuests?: number;
  numNights?: number;
  totalPrice?: number;
  status?: 'unconfirmed' | 'checked-in' | 'checked-out';
  extrasPrice?: number;
}
