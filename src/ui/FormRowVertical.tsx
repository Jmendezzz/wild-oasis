import React from "react";
import { ReactElement } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children }:{label?:string, error?:string, children: ReactElement | ReactElement[]}) {
  const childrenArray = React.Children.toArray(children);
  return (
    <StyledFormRow>
      {label && <Label htmlFor={(childrenArray[0] as React.ReactElement).props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
