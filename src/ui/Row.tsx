import styled,{css} from 'styled-components';

interface Props {
  type: 'vertical' | 'horizontal';
}
const Row = styled.div<Props>`
  display: flex;
  ${(props) => props.type === 'horizontal' && css`
    justify-content:space-between;
    align-items:center;
  `}
  ${(props) => props.type === 'vertical' && css`
    flex-direction:column;
    gap:1.6rem;
  `}
`;


// Also it is possible to define default props
// Row.defaultProps = {
//     type:'vertical'
// }
export default Row;