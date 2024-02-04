import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import Sort from '../../ui/Sort';

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
      <Sort
        options={[
          { value: 'name-asc', label: 'Sort by name (A-Z)' },
          { value: 'name-desc', label: 'Sort by name (Z-A)' },
          { value: 'regularPrice-asc', label: 'Sort by pice (low first)' },
          { value: 'regularPrice-desc', label: 'Sort by pice (high first)' },
          { value: 'maxCapacity-asc', label: 'Sort by capacity (low first)' },
          { value: 'maxCapacity-desc', label: 'Sort by capacity (high first)' },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
