import styled from 'styled-components';
import { Cabin } from '../../interfaces/Cabin';
import { formatCurrency } from '../../utils/helpers';
import { useDeleteCabin } from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import Row from '../../ui/Row';
import { useCreateEditCabin } from './useCreateEditCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import CreateCabinForm from './CreateCabinForm';



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
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: Cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { mutate, isLoading } = useCreateEditCabin(false);

  function duplicateCabinHandler() {
    mutate({
      name: `Copy of ${cabin.name}`,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      image: cabin.image,
      discount: cabin.discount,
      description: cabin.description,
    });
  }

  if(!cabin.id){
    return null;
  }
  return (
    <Table.Row>
      <Img src={typeof cabin.image === 'string' ? cabin.image : ''} />
      <CabinItem>{cabin.name}</CabinItem>
      <div>Fits up to {cabin.maxCapacity} guests</div>
      <Price>{formatCurrency(cabin.regularPrice)}</Price>
      <Discount>{cabin.discount > 0 ? formatCurrency(cabin.discount) : '-'}</Discount>
      <Row type="horizontal">
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabin.id.toString()} />

            <Menus.List id={cabin.id.toString()}>
              <Menus.Button
                onClick={duplicateCabinHandler}
                icon={<HiSquare2Stack />}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit-form">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete-form">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            
            <Modal.Window name="edit-form">
              <CreateCabinForm editCabinData={cabin} />
            </Modal.Window>

            <Modal.Window name="delete-form">
              <ConfirmDelete
                resourceName={cabin.name}
                onConfirm={() => cabin.id && deleteCabin(cabin.id)}
                disabled={isDeleting || isLoading}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Row>
    </Table.Row>
  );
}

export default CabinRow;
