import styled, { keyframes } from 'styled-components';
const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;
export const WrapperDetails = styled.div`
  display: flex;
  flex-wrap: row wrap;
  justify-content: space-evenly;
  width: 100%;
  padding-bottom: 2rem;
  @media screen and (max-width: 768px) and (orientation: portrait) {
    flex-direction: column;
    align-items: left;
    justify-content: space-between;
  }
  @media screen and (max-width: 768px) and (orientation: landscape) {
    align-items: left;
    justify-content: space-between;
  }
`;
export const DescriptionParagraf = styled.p`
  display: flex;
  height: auto;
  width: 100%;
  padding-right: 1rem;
  flex-direction: column;
  white-space: pre-line !important;
  a {
    margin: 0 !important;
    padding: 0 !important;
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
  @media screen and (max-width: 768px) and (orientation: portrait) {
    padding: 0;

    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: flex-start;
    div {
      display: flex;
      padding: 0 !important;
      margin: 0 !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      justify-content: flex-start !important;
      width: 13rem !important;
    }
    img {
      width: 7rem;

      margin-left: 1rem !important;
    }
    a {
      text-align: left !important;
    }
    h2,
    h4 {
      align-self: flex-start;
      justify-self: flex-start;
      width: max-content;
      font-size: 0.8rem;
      font-weight: bold;
    }
    hr {
      width: 10rem;
      height: 1px;
      margin-top: 0%;
      margin-left: 1rem;
      margin-bottom: 0.3rem;
      color: var(--bar-color);
    }
  }
`;
export const WrapperColumn = styled.div`
  display: flex;
  margin-top: 2rem;
  flex-direction: column;
  width: 60%;
  animation: ${fadeIn} 200ms ease-in-out forwards;
  @media screen and (max-width: 768px) and (orientation: portrait) {
    width: 100%;
  }
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
export const ListEpisodio = styled.div`
  width: 100%;
  min-height: 12rem;
  margin-top: wrem;
  padding: 1rem !important;

  h2 {
    font-weight: bold;
    font-size: 1.5rem;
    margin-top: 1rem;
  }
  p {
    margin-top: 1rem;
    font-size: 0.8rem;
    white-space: pre-line !important;
  }
  audio {
    margin-top: 1rem;
    width: 100%;
  }
`;
