import React, { useState, useRef } from 'react';
import ResultModal from './ResultModal';

// ! If we use it outside the component, everything will be ok
// ! This variable will be shared across all the timers
// ! So none of the timers will have the unique identifier
// ! Every time the component rerenders the unique identifier will store the last value

const TimerChallenge = ({ title, targetTime }) => {
  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(targetTime * 1000);

  // ! Now, every ref will be independent from each other, even that its defined insede of the comp
  // ? This value does not really impact on the UI, so we can manage this as a ref
  // ? Also the value of ref will store the whole time, is won`t be deleted
  const timer = useRef();
  // ! We can use this ref in another component, only because of forwardRef() !!!
  // ? Now here we store the object that returned by a useImperativeHandle hook.
  const dialog = useRef();

  const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

  // the timer stops itself because there is no time left (we lost)
  if (remainingTime <= 0) {
    clearInterval(timer.current);
    // opening modal
    dialog.current.open();
  }

  const handleReset = () => {
    setRemainingTime(targetTime * 1000);
  };

  // ! This variable is recreated every time the component rerenders
  //  let timer;
  const handleStart = () => {
    timer.current = setInterval(() => {
      // setTimerExpired(true);
      // ! the <dialog> element has built-in prop showModal(), so using ref, we call it when the timer has expired
      // // dialog.current.showModal();
      // // ! This open() is a method of an object that we return from the useImperativeHandle hook
      // dialog.current.open();
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);
  };

  // manually stop the timer
  const handleStop = () => {
    //   ! So the timer will not stop
    clearInterval(timer.current);
    // opening modal
    dialog.current.open();
  };

  return (
    <>
      <ResultModal targetTime={targetTime} ref={dialog} remainingTime={remainingTime} onReset={handleReset} />
      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} {targetTime > 1 ? 'seconds' : 'second'}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Timer is running' : 'Timer is inactive'}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
