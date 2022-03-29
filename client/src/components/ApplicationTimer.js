import React, { useEffect, useState } from "react";

export default function ApplicationTimer() {
  const [daysLeft, setdaysLeft] = useState("");
  const [HoursLeft, setHoursLeft] = useState("");
  const [MinsLeft, setMinsLeft] = useState("");
  const [SecondsLeft, setSecondsLeft] = useState("");

  // Run myfunc every second
  useEffect(() => {
    let countDownDate = new Date("Mar 30, 2022 23:59:59").getTime();
    let mytimer = setInterval(function () {
      let now = new Date().getTime();
      let timeleft = countDownDate - now;

      // Calculating the days, hours, minutes and seconds left
      let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

      // Result is output to the specific element
      setdaysLeft(days);
      setHoursLeft(hours);
      setMinsLeft(minutes);
      setSecondsLeft(seconds);
      // Display the message when countdown is over
      if (timeleft < 0) {
        clearInterval();
        setdaysLeft("");
        setHoursLeft("");
        setMinsLeft("");
        setSecondsLeft("");
      }
    }, 1000);
    return () => {
      clearInterval(mytimer);
    };
  }, []);

  return (
    <>
      <span>Application closes in</span>
      <span className="timer">
        <span className="counter-bars">
          DAYS: <strong>{daysLeft}</strong>
        </span>
        <span className="counter-bars">
          HOURS: <strong>{HoursLeft}</strong>
        </span>
        <span className="counter-bars">
          MINS: <strong>{MinsLeft}</strong>
        </span>
        <span className="counter-bars">
          SECS: <strong>{SecondsLeft}</strong>
        </span>
      </span>
    </>
  );
}
