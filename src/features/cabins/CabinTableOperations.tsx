import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: 'all', label: 'All' },
          { value: 'with-discount', label: 'Discount' },
          { value: 'no-discount', label: 'No discount' },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
