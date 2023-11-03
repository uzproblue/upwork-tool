import { useEffect, useState } from "react";
import "./App.css";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbCurrencyZloty } from "react-icons/tb";
import { BsCurrencyDollar } from "react-icons/bs";
import { PiCurrencyDollarFill } from "react-icons/pi";
function App() {
  const [input, setInput] = useState();
  const [hourRateInput, setHourRateInput] = useState();

  const [expectedAmount, setExpectedAmount] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  function handleClear() {
    setInput("");
    setExpectedAmount("");
    setHourRateInput("");
  }
  useEffect(() => {
    fetch(
      "https://api.currencyapi.com/v3/latest?apikey=cur_live_oGIs0GaTYjdwJIeot7pXUdd82w0iO1YXoxerVjIF&currencies=PLN"
    )
      .then((res) => res.json())
      .then((res) => setExchangeRate((res?.data?.PLN?.value).toFixed(2)));
  }, []);
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
              const payout = value * 0.877;
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
              const fee = value / 0.877;
              setExpectedAmount(value);
              setInput(fee.toFixed(2));
            }}
            className="amount-input"
          />
        </div>
        <button onClick={() => handleClear()}>
          <MdOutlineDeleteOutline size={24} color="gray" />
        </button>
        {expectedAmount && exchangeRate && (
          <>
            <p className="payment">
              {expectedAmount} X {exchangeRate + " = "}
              {(exchangeRate * expectedAmount).toFixed(2)}
              <TbCurrencyZloty size={36} />
            </p>
            <p className="payment bt">
              {(input * 0.86).toFixed(2)}
              <BsCurrencyDollar size={28} />
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default App;
