import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;

export const bounce = keyframes`
   0% {
    transform: translateY(0);
    box-shadow: 0 5px 5px rgba(0,0,0,0.02), 0 1px 1px rgba(0,0,0,0.23);
  }
  50% {
    transform: translateY(-5px);
    box-shadow: 0 5px 10px rgba(0,0,0,0.19), 0 4px 4px rgba(0,0,0,0.23);
  }
  100% {
    transform: translateY(0);
  }
`;
export const Paginator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  padding: 20px;

  button {
    padding: 7px 14px;
    margin: 0 5px;
    border: none;
    background: #ddd;
    transition: all 0.3s ease;
    font-size: 0.8rem;
    border-radius: var(--radius-size);
    cursor: pointer;
    box-shadow: 1.5px 1.5px 2.5px #bbb, -1.5px -1.5px 2.5px #fff;
  }

  button:hover {
    background: #bbb;
    box-shadow: inset 1.5px 1.5px 2.5px #999, inset -1.5px -1.5px 2.5px #ddd;
  }

  button.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  button.arrow {
    line-height: 10px;
    border-radius: var(--radius-size);
    color: white;
  }
  button.active {
    background-color: #2470b5;
    color: #ffffff;
  }
`;
export const ProgressBar = styled.span`
  .progress-bar-container {
    height: 20px;
    border-radius: 10px;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    width: 100%;
    background: red;
  }
`;
export const PodcastContainer = styled.ul`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
  margin-top: 4rem;
  /* Small devices (portait phones, 576px and up) */
  @media screen and (max-width: 768px) and (orientation: portrait) {
    flex-flow: column wrap;
    padding: 0px;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid red; */
  }
  @media screen and (max-width: 768px) and (orientation: landscape) {
    justify-content: space-evenly;
    padding: 0px;
    align-items: center;
  }
`;
export const PodcastItem = styled.li`
  display: flex;
  justify-content: flex-start;
  opacity: 0;
  align-items: flex-start;
  margin: var(--min-spacer);
  width: auto;
  height: auto;
  margin-bottom: 3rem;
  padding: 1rem;
  cursor: pointer;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: ${(props) => props.index * 0.2}s;
  h2 {
    font-size: 1.05rem;
    color: #353535;
    font-weight: bold;
  }
  p {
    font-size: 0.8rem;
    color: #4e4e4e;
  }
`;

export const Avatar = styled.div`
  z-index: 2;
  margin-top: -4rem;
  margin-bottom: 0.3rem;
  img {
    border-radius: 50%;
    width: 5.8rem;
    height: 5.8rem;
    overflow: hidden;
    object-position: center;
    object-fit: cover;
    border: none;
    background-color: #888888;
    transition: all 0.3s ease-in-out;
    ${PodcastItem}:hover & {
      animation: ${bounce} 1s infinite;
    }
  }
`;
export const PodcastData = styled.div`
  display: flex;
  width: 10rem;
  border-radius: var(--radius-size) !important;
  border-color: var(--border-color) !important;
  box-shadow: rgba(5, 5, 93, 0.15) 0px 2px 2px -1px,
    rgba(0, 0, 0, 0.2) 0px 1px 3px -1px;
`;

// /* Medium devices (tablets, 768px and up) */
// @media (min-width: 768px) { ... }

// /* Large devices (desktops, 992px and up) */
// @media (min-width: 992px) { ... }

// /* Extra large devices (large desktops, 1200px and up) */
// @media (min-width: 1200px) { ... }
