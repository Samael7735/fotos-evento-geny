import React from 'react';
import { Provider } from 'jotai';
import Routes from './Routes/routes';
import './index.css';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  dark: {
      100: "#06090F",
      200:'#151B26',
      300:'#06090F'
  },
  textColor: {
      100: "white",
      200: "#E9E9E9",
  },
  blueGradient: {
      100: "#6686F6",
  },
};

const theme = extendTheme({ colors });

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <Provider>
          <Routes />
        </Provider>
      </React.StrictMode>
    </ChakraProvider>
  );
}

export default App;