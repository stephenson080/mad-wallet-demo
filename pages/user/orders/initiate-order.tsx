import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../../components/Nav";
import { getButRate, getUserBanks, getSellRate, initOrder } from "../../../store/actions";
import { OrderType, AppState } from "../../../store/constants";



export interface OrderState {
  amount: string;
  orderType: string | OrderType
  walletAddress: string;
  bankId: string;
  cash: string;
}
export default function BuyBUSD() {
  const [state, setState] = useState<OrderState>({
    amount: "",
    orderType: '',
    walletAddress: "",
    bankId: "",
    cash: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const banks = useSelector((state: AppState) => state.banks);

  function getBanks() {
    dispatch(getUserBanks(setLoading));
  }

  useEffect(() => {
    getBanks();
  }, []);

  async function getBuyRateFn(amountInNGN: string) {
    try {
      if (amountInNGN === "") {
        return;
      }
      const resData = await getButRate(amountInNGN);
      console.log(resData);
      const busdAmount = parseFloat((+state.cash / resData.exchangeRate).toString()).toFixed(2);
      setState({
        ...state,
        amount: busdAmount
      })
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function getSellRateFn(amountInBUSD: string) {
    try {
      if (amountInBUSD === "") {
        return;
      }
      const resData = await getSellRate(amountInBUSD);
      const nairaAmount = parseFloat((+state.amount * resData.exchangeRate).toString()).toFixed(2);
      setState({
        ...state,
        cash: nairaAmount
      })
    } catch (error: any) {
      alert(error.message);
    }
  }

  function initiateOrderFn() {
    try {
      console.log(state)
      dispatch(initOrder(state, setLoading))
    } catch (error: any) {
      alert(error.message);
    }
  }
  return (
    <>
      <Nav page = 'orders' />
      <div className="container">
        <div>
          <p style={{ marginBottom: "30px" }}>
            Fill the form to initiate a buy order
          </p>
          <form
            style={{
              width: "100%",
            }}
          >
            <div className="form-field">
              <label>Order Type</label>
              <select
                value={state.orderType}
                onChange={(e) =>
                  setState({
                    ...state,
                    orderType: e.target.value,
                  })
                }
              >
                <option value="">Select Order type</option>
                <option value='1'>BUY ORDER</option>
                <option value='2'>SELL ORDER</option>
              </select>
            </div>
            <div className="form-field">
              <label>Bank</label>
              <select
                value={state.bankId}
                onChange={(e) =>
                  setState({
                    ...state,
                    bankId: e.target.value,
                  })
                }
              >
                <option value="">Select Bank</option>
                {banks.map((bank, index) => {
                  return (
                    <option key={index} value={bank.id}>
                      {bank.accountNumber} {bank.bankName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-field">
              <label>Amount (Naira)</label>
              <input
                disabled = {state.orderType === '' || state.orderType === '2' ?  true : false}
                value={state.cash}
                onChange={(e) => setState({ ...state, cash: e.target.value })}
                onBlur={() => getBuyRateFn(state.cash)}
              />
            </div>
            <div className="form-field">
              <label>Amount (BUSD)</label>
              <input
                disabled = {state.orderType === '' || state.orderType === '1' ?  true : false}
                value={state.amount}
                onChange={(e) => setState({ ...state, amount: e.target.value })}
                onBlur={() => getSellRateFn(state.amount)}
              />
              <p style={{fontSize: "15px", color: 'blue'}}>Minimum Amount of BUSD to buy or sell: 5 and max: 100000</p>
            </div>
            <div className="form-field">
              <label>Wallet Address</label>
              <input
                value={state.walletAddress}
                onChange={(e) =>
                  setState({ ...state, walletAddress: e.target.value })
                }
              />
            </div>
            <button type="button" onClick={initiateOrderFn} disabled = {!state.bankId || !state.walletAddress || !state.orderType ? true : false} className="button primary">{loading ? "Initiating Order..." : "Initiate Order"}</button>
          </form>
        </div>
      </div>
    </>
  );
}
