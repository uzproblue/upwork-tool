import { useState } from "react";
import "./App.css";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { PiCurrencyDollarFill } from "react-icons/pi";
function App() {
  const [input, setInput] = useState();
  const [hourRateInput, setHourRateInput] = useState();

  const [expectedAmount, setExpectedAmount] = useState();
  function handleClear() {
    setInput("");
    setExpectedAmount("");
    setHourRateInput("");
  }
  return (
    <>
      <div className="App">
        <div className="container">
          <label>Hourly Rate</label>
          <input
            type="number"
            placeholder="Rate"
            value={hourRateInput}
            style={{
              width: "80px",
            }}
            onChange={(e) => {
              const value = e.target.value;
              // const payout = value * 0.877;
              // setInput(value);
              setHourRateInput(value);
            }}
            className="amount-input hour-rate-input"
          />
          <span className="currencyLabel">
            <PiCurrencyDollarFill size={30} />
          </span>
        </div>
        <div className="container">
          <label>Earned amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={input}
            onChange={(e) => {
              const value = e.target.value;
              const payout = value * 0.9;
              setInput(value);
              setExpectedAmount(payout.toFixed(2));
            }}
            className="amount-input"
          />
        </div>
        <div className="container">
          <label>Expected payout</label>
          <input
            type="number"
            placeholder="Expected amount"
            value={expectedAmount}
            onChange={(e) => {
              const value = e.target.value;
              const fee = value / 0.9;
              setExpectedAmount(value);
              setInput(fee.toFixed(2));
            }}
            className="amount-input"
          />
        </div>
        <button onClick={() => handleClear()}>
          <MdOutlineDeleteOutline size={24} color="gray" />
        </button>
      </div>
      {hourRateInput && (
        <div className="workedfor">
          Worked for <b>{(input / hourRateInput).toFixed(2)}</b> hours
        </div>
      )}
    </>
  );
}

export default App;
