import styled from 'styled-components';
import DashboardBox from './DashboardBox';
import Heading from '../../ui/Heading';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDarkModeContext } from '../../context/DarkModeContext';
import { Booking } from '../../interfaces/Booking';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({
  bookings,
  numDays,
}: {
  bookings: Booking[];
  numDays: number;
}) {
  const { isDarkMode } = useDarkModeContext();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };

  const dates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = dates.map((d) => {
    return {
      label: format(d, 'MMM dd'),
      totalSales: bookings
        .filter((b) => isSameDay(d, new Date(b.created_at)))
        .reduce((acc, booking) => acc + booking.totalPrice, 0),
      extrasSales: bookings
        .filter((b) => isSameDay(d, new Date(b.created_at)))
        .reduce((acc, booking) => acc + booking.extrasPrice, 0),
    };
  });
  return (
    <StyledSalesChart>
      <Heading as="h2">Sales</Heading>
      <ResponsiveContainer height={300} width={'100%'}>
        <AreaChart data={data}>
          <XAxis
            dataKey={'label'}
            tick={{ fill: colors.text }}
            tickLine={{ fill: colors.text }}
          />
          <YAxis unit={'$'} />
          <CartesianGrid strokeDasharray={4} />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type={'monotone'}
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit={'$'}
          />
          <Area
            dataKey="extrasSales"
            type={'monotone'}
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit={'$'}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
