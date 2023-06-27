import { createGlobalStyle } from "styled-components";
const font3 =
  "https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap";
const font1 = "https://fonts.googleapis.com/css2?family=Work+Sans&display=swap";
const font2 = "https://fonts.googleapis.com/css2?family=Pacifico&display=swap";
const font4 = "https://fonts.googleapis.com/css2?family=Dosis&display=swap";

// const getHeightDoc = () => {
//   const { scrollHeight: height } = document.body;
//   return {
//     height
//   };
// }

export const GlobalStyle = createGlobalStyle`
    
    p {
        font-family: "Work Sans", sans-serif;
    }

	body {
        font-family: "Work Sans", sans-serif;    
	}
    @font-face {
        font-family: 'Dosis', sans-serif;
        src: url(${font4});
    }
    @font-face {
        font-family: 'Syncopate', sans-serif;
        src: url(${font3});
    }
    @font-face {
        font-family: "Pacifico", sans-serif;
        src: url(${font2});
    }
    @font-face {
        font-family: "Work Sans", sans-serif;
        src: url(${font1});
    }
    
`;
