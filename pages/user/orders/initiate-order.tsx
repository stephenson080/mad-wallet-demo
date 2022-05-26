import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Nav from "../../../components/Nav";
import {
  getButRate,
  getUserBanks,
  getSellRate,
  initOrder,
  autoAuth,
  getCurrencies,
} from "../../../store/actions";
import { OrderType, AppState, Currency } from "../../../store/constants";

export interface OrderState {
  amount: string;
  orderType: string | OrderType;
  walletAddress: string;
  bankId: string;
  payInCurrency: string;
  receiveInCurrency: string;
  rate: string;
}
export default function BuyBUSD() {
  const [state, setState] = useState<OrderState>({
    amount: "",
    orderType: "",
    walletAddress: "",
    bankId: "",
    payInCurrency: "",
    receiveInCurrency: "",
    rate: "",
  });
  const [fiatCurrs, setFiatCurr] = useState<Currency[]>([]);
  const [crytoCurrs, setCrytoCurr] = useState<Currency[]>([]);
  const [payInCurrs, setPayInCurrs] = useState<Currency[]>([]);
  const [receiveCurrs, setReceiveInCurrs] = useState<Currency[]>([]);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const banks = useSelector((state: AppState) => state.banks);
  const user = useSelector((state: AppState) => state.user);

  useEffect(() => {
    if (user) {
      return;
    }
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.replace("/register");
      return;
    }
    autoAuthFn(userId);
  }, [user]);

  function autoAuthFn(userId: string) {
    try {
      dispatch(autoAuth(userId, setLoading));
    } catch (error: any) {
      alert(error.message);
    }
  }

  function getBanks() {
    dispatch(getUserBanks(setLoading));
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.replace("/register");
      return;
    }
    getBanks();
    getCurrenciesFn()
  }, []);

  async function getCurrenciesFn() {
    try {
      const fiat = await getCurrencies("1");
      const cryto = await getCurrencies("2");
      setFiatCurr(fiat);
      setCrytoCurr(cryto);
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function getBuyRateFn(amountInNGN: string) {
    try {
      const resData = await getButRate(amountInNGN);
      setState({
        ...state,
        rate: resData.exchangeRate,
      });
    } catch (error: any) {
      alert(error.message);
    }
  }

  function orderTypeOnBlurhandler() {
    if (state.orderType === "") {
      setPayInCurrs([]);
      setReceiveInCurrs([]);
    setState({
      ...state,
      rate: "",
    })
      return;
    }
    if (state.orderType === "1") {
      console.log('buy', fiatCurrs, crytoCurrs)
      getBuyRateFn("1000");
      setPayInCurrs([...fiatCurrs]);
      setReceiveInCurrs([...crytoCurrs]);
      return;
    }
    getSellRateFn("1000");
    setPayInCurrs([...crytoCurrs]);
    setReceiveInCurrs([...fiatCurrs]);
  }

  async function getSellRateFn(amountInBUSD: string) {
    try {
      const resData = await getSellRate(amountInBUSD);
      setState({
        ...state,
        rate: resData.exchangeRate,
      });
    } catch (error: any) {
      alert(error.message);
    }
  }

  function initiateOrderFn() {
    try {
      console.log(state);
      dispatch(initOrder(state, setLoading));
    } catch (error: any) {
      alert(error.message);
    }
  }
  return (
    <>
      <Nav page="orders" />
      <div className="container">
        <div>
          <p style={{ marginBottom: "30px" }}>
            Fill the form to initiate an order
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
                onChange = {(e) => setState({...state, orderType: e.target.value})}
                onBlur={orderTypeOnBlurhandler}
              >
                <option value="">Select Order type</option>
                <option value="1">BUY ORDER</option>
                <option value="2">SELL ORDER</option>
              </select>
            </div>
            <div className="form-field">
              <label>Buy Currency</label>
              <select
                value={state.payInCurrency}
                onChange={(e) =>
                  setState({
                    ...state,
                    payInCurrency: e.target.value,
                  })
                }
              >
                <option value="">Select Currency</option>
                {
                  payInCurrs.map((curr, index) => (
                    <option key={index} value={curr.id}>{curr.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-field">
              <label>Sell Currency</label>
              <select
                value={state.receiveInCurrency}
                onChange={(e) =>
                  setState({
                    ...state,
                    receiveInCurrency: e.target.value,
                  })
                }
              >
                <option value="">Select Currency</option>
                {
                  receiveCurrs.map((curr, index) => (
                    <option key={index} value={curr.id}>{curr.name}</option>
                  ))
                }
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
              <label>
                Amount to{" "}
                {state.orderType === "1"
                  ? "Buy"
                  : state.orderType === "2"
                  ? "Sell"
                  : "..."}
              </label>
              <input
                value={state.amount}
                onChange={(e) => setState({ ...state, amount: e.target.value })}
              />
              <p>Rate is: {state.rate}</p>
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
            <button
              type="button"
              onClick={initiateOrderFn}
              disabled={
                !state.bankId || !state.walletAddress || !state.orderType
                  ? true
                  : false
              }
              className="button primary"
            >
              {loading ? "Please Wait..." : "Initiate Order"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
