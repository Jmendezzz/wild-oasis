import styled from 'styled-components';
import BookingDataBox from '../bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import { useEffect, useState } from 'react';
import { useCheckin } from './useCheckin';
import { useSettings } from '../settings/useSettings';
import { formatCurrency } from '../../utils/helpers';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isPaid, setIsPaid] = useState<boolean>();
  const [optionalBreakfast, setOptionalBreakfast] = useState<boolean>();
  const moveBack = useMoveBack();

  const { booking, isLoading } = useBooking();

  const { checkin, isCheckinIn } = useCheckin();

  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setIsPaid(booking?.isPaid);
  }, [booking]);

  if (isLoading || isLoadingSettings) {
    return <Spinner />;
  }

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!isPaid) return;

    if(optionalBreakfast){
      checkin({
        id: bookingId,
        status:'checked-in',
        isPaid:true,
        totalPrice: totalPrice + optionalBreakfastPrice,
        extrasPrice: optionalBreakfastPrice,
        hasBreakfast: true
      });

    }else{
      checkin({
        id: bookingId,
        status:'checked-in',
        isPaid:true
      });

    }

  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            onChange={() => {
              if (optionalBreakfast) {
                setIsPaid(true);
                setOptionalBreakfast(false);
              } else {
                setOptionalBreakfast(true);
                setIsPaid(false);
              }
            }}
            id={bookingId}
          >
            {`Want to add breakfast service for ${formatCurrency(
              optionalBreakfastPrice
            )}`}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={isPaid}
          onChange={() => setIsPaid(true)}
          disabled={isPaid}
          id={bookingId}
        >
          I confirm that {guests.fullName} has already paid the total amount!{' '}
          {optionalBreakfast &&
            `Including the breakfast service ${formatCurrency(
              totalPrice + optionalBreakfastPrice
            )}`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!isPaid || isCheckinIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
