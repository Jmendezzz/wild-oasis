import styled from "styled-components";
import { Cabin } from "../../interfaces/Cabin";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const CabinItem = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;


function CabinRow({cabin}:{cabin:Cabin}) {
  const queryClient = useQueryClient();
  const {isPending:isDeleting, mutate} = useMutation({
    mutationFn:deleteCabin,
    onSuccess: () => {
      alert('Cabin successfully deleted')
      queryClient.invalidateQueries({
        queryKey:['cabins']
      })
    },
    onError: err => alert(err.message)
  })
  return (
    <TableRow>
      <Img src={cabin.image} />
      <CabinItem>{cabin.name}</CabinItem>
      <div>Fits up to {cabin.maxCapacity} guests</div>
      <Price>{formatCurrency(cabin.regularPrice)}</Price>
      <Discount>{formatCurrency(cabin.discount)}</Discount>
      <button onClick={()=> mutate(cabin.id)} disabled={isDeleting}>delete</button>
    </TableRow>
  )
}

export default CabinRow