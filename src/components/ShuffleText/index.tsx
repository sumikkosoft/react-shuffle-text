import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ShuffleTextProps = {
  tag?: keyof JSX.IntrinsicElements;
  emptyChars?: string;
  randomChars?: string;
  startDelay?: number;
  displayTime?: number;
  intervalTime?: number;
  hover?: boolean;
};

export const ShuffleText: React.FC<ShuffleTextProps> = (props) => {
  const {
    tag = "span",
    emptyChars = "-",
    randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ?!#$%&()=~-|",
    startDelay = 100,
    displayTime = 1000,
    intervalTime = 10,
    hover = false,
    children,
  } = props;
  const ShuffleTextElement = useMemo(() => {
    return tag;
  }, [tag]);
  const text = useMemo(() => {
    return typeof children === "string" ? children : "";
  }, [children]);

  const [outputText, setOutputText] = useState<string>("");
  const refText = useRef<string>("");
  const refTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const initTime = useRef<number>(0);
  const shuffleLength = useRef<number>(0);
  const outputLength = useRef<number>(0);

  const init = useCallback((): void => {
    clearTimeout(refTimer.current);
    initTime.current = new Date().getTime();
    refText.current = "";
    shuffleLength.current = 0;
    outputLength.current = 0;
    setOutputText("");
  }, []);

  const generateRandomChars = useCallback(
    (l: number): string => {
      let chars = "";
      for (let i = 0; i < l; i++) {
        chars += randomChars[Math.floor(Math.random() * randomChars.length)];
      }

      return chars;
    },
    [randomChars]
  );

  const handleShuffle = useCallback(() => {
    if (outputLength.current >= text.length) return;

    const currentTime = new Date().getTime();

    if (text.length > refText.current.length) {
      refText.current += emptyChars;
    }

    refText.current =
      generateRandomChars(shuffleLength.current) + refText.current.slice(shuffleLength.current);

    if (text.length > shuffleLength.current && refText.current.length > 2)
      shuffleLength.current += 1;

    if (currentTime - initTime.current > displayTime) {
      outputLength.current += 1;
      refText.current =
        text.slice(0, outputLength.current) + refText.current.slice(outputLength.current);
    }

    setOutputText(refText.current);

    refTimer.current = setTimeout(handleShuffle, intervalTime);
  }, [displayTime, emptyChars, generateRandomChars, intervalTime, text]);

  const start = useCallback((): void => {
    init();
    setTimeout(handleShuffle, startDelay);
  }, [handleShuffle, init, startDelay]);

  useEffect(() => {
    start();

    return () => clearTimeout(refTimer.current);
  }, [start]);

  return (
    <ShuffleTextElement
      onMouseOver={() => {
        if (hover) start();
      }}
    >
      {outputText}
    </ShuffleTextElement>
  );
};
