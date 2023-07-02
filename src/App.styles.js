import styled from "styled-components";

const SCApp = styled.div`
  color: var(--primary-color);

  .card {
    box-shadow: rgba(5, 5, 93, 0.15) 0px 2px 2px -1px,
      rgba(0, 0, 0, 0.2) 0px 1px 3px -1px !important;

    border-color: rgb(238, 242, 247) !important;
    border-radius: var(--radius-size) !important;
    display: flex;
    padding: 0.5rem;
  }
  .grow-effect {
    transition: transform 0.3s ease-in-out;
  }

  .grow-effect:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;
export default SCApp;
