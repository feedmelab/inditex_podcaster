import styled, { keyframes } from "styled-components";

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
`;

export const PodcastItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: var(--min-spacer);
  width: auto;
  height: auto;
  margin-bottom: 3rem;
  padding: 1rem;
  cursor: pointer;

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
