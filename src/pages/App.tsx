import React from "react";
import { ShuffleText } from "../components/ShuffleText";

const App = () => {
  return (
    <div className="container mx-auto">
      <h1 className="block mt-4 text-4xl font-bold">Shuffle Text</h1>
      <div className="flex flex-wrap items-center justify-center h-96">
        <div className="w-80">
          <p className="text-4xl font-bold">
            <ShuffleText intervalTime={50} displayTime={3000}>
              Hello world!
            </ShuffleText>
          </p>
          <p>mode: in</p>
        </div>
        <div className="w-80">
          <p className="text-4xl font-bold">
            <ShuffleText intervalTime={50} displayTime={3000} hover>
              Hello world!
            </ShuffleText>
          </p>
          <p>mode: hover</p>
        </div>
      </div>
    </div>
  );
};

export default App;
