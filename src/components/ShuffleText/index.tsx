import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ShuffleTextProps = {
  tag?: keyof JSX.IntrinsicElements;
  emptyChars?: string;
  randomChars?: string;
  startDelay?: number;
  displayTime?: number;
  intervalTime?: number;
  hover?: boolean;
  click?: boolean;
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
    click = false,
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
  const refRequestAnimationFrame = useRef<ReturnType<typeof requestAnimationFrame> | undefined>(
    undefined
  );
  const initTime = useRef<number>(0);
  const prevTime = useRef<number>(0);
  const shuffleLength = useRef<number>(0);
  const outputLength = useRef<number>(0);

  const init = useCallback((): void => {
    if (refRequestAnimationFrame.current) cancelAnimationFrame(refRequestAnimationFrame.current);
    if (refTimer.current) refTimer.current;
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

    if (currentTime - prevTime.current > intervalTime) {
      prevTime.current = currentTime;

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
    }

    refRequestAnimationFrame.current = requestAnimationFrame(handleShuffle);
  }, [displayTime, emptyChars, generateRandomChars, intervalTime, text]);

  useEffect(() => {
    init();
    refTimer.current = setTimeout(handleShuffle, startDelay);

    return () => clearTimeout(refTimer.current);
  }, [handleShuffle, init, startDelay]);

  const onEvents = useMemo(() => {
    const events: {
      onMouseOver?: () => void;
      onClick?: () => void;
    } = {};
    if (hover) {
      events.onMouseOver = () => {
        init();
        refTimer.current = setTimeout(handleShuffle, startDelay);
      };
    }

    if (click) {
      events.onClick = () => {
        init();
        refTimer.current = setTimeout(handleShuffle, startDelay);
      };
    }

    return events;
  }, [hover, click, init, handleShuffle, startDelay]);

  return <ShuffleTextElement {...onEvents}>{outputText}</ShuffleTextElement>;
};
