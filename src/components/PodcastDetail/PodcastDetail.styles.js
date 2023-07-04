import styled from "styled-components";

export const WrapperDetails = styled.div`
  display: flex;
  flex-wrap: row wrap;
  justify-content: space-evenly;
  width: 100%;
  padding-bottom: 2rem;
`;
export const DescriptionParagraf = styled.div`
  display: flex;
  padding: auto;
  p {
    display: flex;
    width: auto;
    height: auto;
    flex-direction: column;
    white-space: pre-line !important;
  }
`;
export const BarraLateral = styled.div`
  margin-top: 2rem;
  width: 12rem;
  display: flex;
  justify-content: flex-start;
  padding-top: 2rem !important;
  align-items: center;
  img {
    width: 50%;
    object-fit: cover;
  }
  a {
    margin: 0px !important;
    padding: 0px !important;
    text-align: center !important;
  }

  h2,
  h4 {
    align-self: flex-start;
    padding-left: 1rem;
    font-size: 0.8rem;
    font-weight: bold;
  }
  h3,
  p {
    display: flex;
    font-size: 0.6rem;
    align-self: flex-start;
    padding-left: 1rem;
    font-style: italic;
  }

  hr {
    width: 10rem;
    color: var(--bar-color);
  }
`;
export const WrapperColumn = styled.div`
  display: flex;
  margin-top: 2rem;
  flex-direction: column;
  width: 60%;
`;
export const BarraEpisodios = styled.div`
  height: 3rem !important;
  padding-left: calc(var(--min-spacer) * 4) !important;
  span {
    font-size: 1.4rem;
    font-weight: bold;
  }
`;
export const ListEpisodios = styled.div`
  width: 100%;
  min-height: 21rem;
  margin-top: 1rem;
  padding: 1rem !important;
  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 0.8rem;
  }
  table span {
    cursor: pointer;
  }
  thead,
  tbody,
  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid var(--border-color) !important;
  }
  thead th {
    border-bottom: 1px solid rgb(215, 215, 213) !important;
  }
  thead th:first-child,
  tbody td:first-child {
    width: 65%;
  }
  tbody td:first-child {
    color: var(--primary-color);
  }
  tbody:nth-child(even) {
    background-color: #f2f2f2;
  }

  tbody:nth-child(odd) {
    background-color: #ffffff;
  }
`;
