import React, { useCallback, useState } from "react";
import { ShuffleText, ShuffleTextProps } from "../components/ShuffleText";

const PageFooter = React.memo(() => {
  return (
    <footer className="pt-12 pb-1 w-full text-center mt-auto">
      <small className="inline-block">
        Please contact{" "}
        <a
          className="underline text-blue-700"
          href="https://github.com/sumikkosoft/react-shuffle-text"
          target="_brank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        or{" "}
        <a
          className="underline text-blue-700"
          href="https://twitter.com/iVgtr"
          target="_brank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        , If you have any.
      </small>
    </footer>
  );
});

const PageContent: React.VFC<{ text: string; options: ShuffleTextProps }> = React.memo(
  ({ text, options }) => {
    return (
      <h1 className="text-4xl font-bold h-12">
        <ShuffleText {...options}>{text.length ? text : "Shuffle Text"}</ShuffleText>
      </h1>
    );
  }
);

const App = () => {
  const [text, setText] = useState<string>("");
  const [emptyChars, setEmptyChars] = useState<string>("-");
  const [randomChars, setRandomChars] = useState<string>("ABCDEFGHIJKLMNOPQRSTUVWXYZ?!#$%&()=~-|");
  const [startDelay, setStartDelay] = useState<number>(100);
  const [displayTime, setDisplayTime] = useState<number>(1000);
  const [intervalTime, setIntervalTime] = useState<number>(10);
  const [click, isClick] = useState<boolean>(false);
  const [hover, isHover] = useState<boolean>(false);

  const options = {
    emptyChars,
    randomChars,
    startDelay,
    displayTime,
    intervalTime,
    click,
    hover,
  };

  const resetState = useCallback(() => {
    setText("");
    setEmptyChars("-");
    setRandomChars("ABCDEFGHIJKLMNOPQRSTUVWXYZ?!#$%&()=~-|");
    setStartDelay(100);
    setDisplayTime(1000);
    setIntervalTime(10);
    isClick(false);
    isHover(false);
  }, []);

  return (
    <div className="container mx-auto flex flex-col">
      <div className="text-center mt-6">
        <PageContent text={text} options={options} />
      </div>
      <div className="mt-6 px-4">
        <form>
          <h2 className="font-bold text-gray-700 block text-2xl">Options</h2>
          <div className="mt-3">
            <button
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
              onClick={() => {
                resetState();
              }}
            >
              Reset
            </button>
          </div>
          <div className="mt-3">
            <label htmlFor="text" className="text-xl font-bold mb-1 text-gray-700 block">
              Text
            </label>
            <input
              id="text"
              type="text"
              placeholder="Shuffle Text"
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              onChange={(e) => {
                setText(e.target.value);
              }}
              defaultValue={text}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="mode" className="text-xl font-bold mb-1 text-gray-700 block">
              Mode
            </label>
            <label htmlFor="click" className="text-gray-700 mr-1">
              Click
            </label>
            <input
              type="checkbox"
              name=""
              id="click"
              checked={click}
              onChange={() => isClick((prev) => !prev)}
            />

            <label htmlFor="hover" className="text-gray-700 mr-1 ml-2">
              Hover
            </label>
            <input
              type="checkbox"
              id="hover"
              checked={hover}
              onChange={() => isHover((prev) => !prev)}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="emptyChars" className="text-xl font-bold mb-1 text-gray-700 block">
              Empty Chars
            </label>
            <input
              id="emptyChars"
              type="text"
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              onChange={(e) => {
                setEmptyChars(e.target.value);
              }}
              defaultValue={emptyChars}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="randomChars" className="text-xl font-bold mb-1 text-gray-700 block">
              Random Chars
            </label>
            <input
              id="randomChars"
              type="text"
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              onChange={(e) => {
                setRandomChars(e.target.value);
              }}
              defaultValue={randomChars}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="startDelay" className="text-xl font-bold mb-1 text-gray-700 block">
              Start Delay
            </label>
            <input
              id="startDelay"
              type="number"
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              onChange={(e) => {
                setStartDelay(Number(e.target.value));
              }}
              defaultValue={startDelay}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="displayTime" className="text-xl font-bold mb-1 text-gray-700 block">
              Display Time
            </label>
            <input
              id="displayTime"
              type="number"
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              onChange={(e) => {
                setDisplayTime(Number(e.target.value));
              }}
              defaultValue={displayTime}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="intervalTime" className="text-xl font-bold mb-1 text-gray-700 block">
              Interval Time
            </label>
            <input
              id="intervalTime"
              type="number"
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              onChange={(e) => {
                setIntervalTime(Number(e.target.value));
              }}
              defaultValue={intervalTime}
            />
          </div>
        </form>
      </div>
      <PageFooter />
    </div>
  );
};

export default App;
