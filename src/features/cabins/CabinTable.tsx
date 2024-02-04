import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import { Cabin } from '../../interfaces/Cabin';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { cabins, isLoading } = useCabins();

  const [searchParams] = useSearchParams();

  const filter = searchParams.get('discount') || 'all';

  let filteredCabins;


  if(filter === 'all') filteredCabins = cabins;

  if(filter === 'with-discount') filteredCabins = cabins?.filter((cabin:Cabin) => cabin.discount > 0 );

  if(filter === 'no-discount') filteredCabins = cabins?.filter((cabin:Cabin) => cabin.discount == 0 );

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Table columns={'0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'}>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>DisCount</div>
        <div></div>
      </Table.Header>
      <Menus>
        <Table.Body
          data={filteredCabins as Array<Cabin>}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Menus>
    </Table>
  );
}

export default CabinTable;
