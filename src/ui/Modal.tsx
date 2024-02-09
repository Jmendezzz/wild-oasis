import {
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 100;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
interface ContextStructure{
  open:(name:string)=> void,
  windowName:string
}
const ModalContext = createContext<ContextStructure>({} as ContextStructure);

function Modal({ children }: { children: ReactNode }) {
  const [windowName, setWindowName] = useState('');
  const open = setWindowName;
  console.log(windowName)

  return (
    <ModalContext.Provider value={{ windowName, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens, children }: { opens: string; children: ReactElement }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }: { children: ReactElement; name: string }) {
  const { open, windowName } = useContext(ModalContext);

  const windowRef = useOutsideClick(() => open(''));

  if (windowName !== name) return null;

  console.log('Window:' + windowName);

  return createPortal(
    <Overlay>
      <StyledModal ref={windowRef as React.RefObject<HTMLDivElement>}>
        <Button onClick={() => open('')}>
          <HiXMark />
        </Button>
        {cloneElement(children, { onCloseModal: () => open('') })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
