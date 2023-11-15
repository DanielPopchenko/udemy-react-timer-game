import React, { useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
// ! the function that allows us to export and get the ref from another component
import { forwardRef } from 'react';

// ! I should wrap the component function with forwardRef, and accept the ref prop -> ({...props}, ref)
const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  // ! Now we can dinamically change element dialog to div, change the logic here and that is it
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  // TODO: CreatePortal is a fn that teleports the code to the place you point to
  // ? Why I do this -> because I do not need it in another place, i need logic here but this code in div(id=modal)
  return createPortal(
    //   ! built-in html element dialog, by the default has all the styles needed for a modal
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      <h2>You {userLost && 'You Lost'}</h2>
      {!userLost && <h2>Your score is {score}</h2>}
      <p>
        The target time was <strong>{targetTime}</strong> seconds.
      </p>
      <p>
        You stopped the timer with <strong>{formattedRemainingTime} seconds left</strong>
      </p>

      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal'),
  );
});

export default ResultModal;
