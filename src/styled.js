import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    
    p {
        font-family: "Raleway", sans-serif;
    }
	body {
        font-family: "Raleway", sans-serif;    
	}
    a{
        text-decoration: none !important;
        color: inherit !important
    }
    :root {
        --primary-color: #2470b5 !important;
        --border-color: #e6e6e4 !important;
        --bar-color: #bcbcba !important;
        --radius-size: 0.1rem !important;
        --min-spacer: 0.3rem;
        --common-shadow: rgba(5, 5, 93, 0.15) 0px 2px 2px -1px,
            rgba(0, 0, 0, 0.2) 0px 1px 3px -1px;
    }  
`;
