import React, { useEffect, useState } from "react";

const Counter = ({ shouldStart }) => {
  const valueDisplays = [
    { label: "Deliveries Completed", endValue: 23000 },
    { label: "Kilos of Freshness Savored", endValue: 51000 },
    { label: "Happy Customers", endValue: 8500 },
  ];

  const duration = 1000;
  const incrementStep = 150;

  const [counterStarted, setCounterStarted] = useState(false);

  useEffect(() => {
    if (shouldStart && !counterStarted) {
      let maxEndValue = 0;

      // Find the maximum end value among all the elements
      valueDisplays.forEach((display) => {
        if (display.endValue > maxEndValue) {
          maxEndValue = display.endValue;
        }
      });

      // Start the counter animation for each element
      valueDisplays.forEach((display) => {
        const { label, endValue } = display;
        let startValue = 0;

        // Calculate the increment interval based on the duration and max end value
        const incrementInterval = (duration * incrementStep) / maxEndValue;

        // Calculate the increment for each step of the counter animation
        const increment = Math.ceil(endValue / (duration / incrementInterval));

        // Start the counter animation using setInterval
        const counter = setInterval(() => {
          startValue += increment;

          // If the startValue reaches or exceeds the endValue, stop the counter
          if (startValue >= endValue) {
            startValue = endValue;
            clearInterval(counter);
          }

          // Update the text content of the element with the current counter value
          document.querySelector(
            `.counter-nums[data-label="${label}"]`
          ).textContent = startValue.toLocaleString() + "+";
        }, incrementInterval);
      });

      // Set the counterStarted flag to true to prevent starting the counter again
      setCounterStarted(true);
    }
  }, [shouldStart, counterStarted]);

  return (
    <section className="counter">
      <div className="counter-row">
        {valueDisplays.map((display, index) => (
          <div className="counter-col" key={index}>
            <h2
              className="counter-nums"
              data-label={display.label}
              data-val={display.endValue}
            >
              0+
            </h2>
            <p>{display.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Counter;
