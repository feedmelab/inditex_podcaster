import styled from 'styled-components';

export const CHeader = styled.div`
  text-decoration: none;
`;
export const CNavArea = styled.div`
  height: 2.53rem;
  display: flex;
  align-items: center;
  margin-top: 1rem;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  a {
    text-decoration: none;
    color: var(--primary-color);
    font-size: 1.8rem;
    font-weight: bolder;
  }
`;
export const SearchArea = styled.div`
  height: 2.53rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  label {
    margin-right: var(--min-spacer);
    border: 1px solid var(--border-color);
    border-radius: var(--min-spacer);
    background-color: var(--primary-color);
    padding-inline: var(--min-spacer);
    color: white;
  }
  input {
    border: 1px solid var(--border-color);
    border-radius: var(--min-spacer);
    padding-inline: var(--min-spacer);
    color: #191919;
    outline: none;
  }
`;
export const ClearButton = styled.button`
  border: 0;
  background-color: var(--primary-color);
  color: white;
  margin-left: 0.3rem;
  border-radius: var(--radius-size);
  font-size: 0.6rem;
  height: 70%;
`;
