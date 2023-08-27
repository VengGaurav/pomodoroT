import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Timer from "./component/Timer";

function App() {
  return (
    <ChakraProvider>
      <CSSReset />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Timer />} />
          <Route
            path="*"
            element={
              <div
                style={{
                  backgroundColor: "yellow",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                404 Not found
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
