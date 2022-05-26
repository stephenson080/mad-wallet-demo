import { NextRouter } from "next/router";
import User from "../models/user";
import Bank from "../models/bank";
import { RegisterState } from "../pages/register";
import {
  BASE_URL,
  Currency,
  DISPATCH_ACTIONS,
  ErrorType,
  HEADERS,
  Order,
} from "./constants";
import { BankState } from "../pages/user/bank";
import { OrderState } from "../pages/user/orders/initiate-order";

export function register(
  state: RegisterState,
  setLoading: Function,
  router: NextRouter
) {
  return async (dispatch: any) => {
    try {
      setLoading(true);
      const user = new User(state.username, state.email, state.phone);
      const resData = await user.registerUser();
      user.id = resData.id;
      dispatch({
        type: DISPATCH_ACTIONS.REGISTER_USER,
        payload: {
          user,
          message: {
            type: ErrorType.SUCCESS,
            header: "Success",
            content: "User registered successfully",
          },
        },
      });
      setLoading(false);
      localStorage.setItem("userId", user.id!);
      alert("User registered successfully");
      router.replace("/user/dashboard");
    } catch (error: any) {
      alert(error.message);
      dispatch({
        type: DISPATCH_ACTIONS.SET_MESSAGE,
        payload: {
          message: {
            type: ErrorType.ERROR,
            header: "Something went wrong",
            content: error.message,
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };
}

export function addBank(
  state: BankState,
  setLoading: Function,
  router: NextRouter
) {
  return async (dispatch: any, getState: any) => {
    try {
      const userId = getState().user?.id || localStorage.getItem("userId");
      const banks = getState().banks;
      setLoading(true);
      const bank = new Bank(
        state.bankName,
        state.accountNumber,
        state.accountName,
        userId
      );
      const resData = await bank.addBank(userId);
      bank.id = resData.id;
      banks.push(bank);
      console.log(resData);
      dispatch({
        type: DISPATCH_ACTIONS.ADD_BANK,
        payload: {
          banks: banks,
          message: {
            type: ErrorType.SUCCESS,
            header: "Success",
            content: "Bank added successfully",
          },
        },
      });
      setLoading(false);
      alert("Bank added successfully");
      router.replace("/user/bank");
    } catch (error: any) {
      alert(error.message);
      dispatch({
        type: DISPATCH_ACTIONS.SET_MESSAGE,
        payload: {
          message: {
            type: ErrorType.ERROR,
            header: "Something went wrong",
            content: error.message,
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };
}

export function getUserBanks(setLoading: Function) {
  return async (dispatch: any, getState: any) => {
    try {
      let banks: Bank[] = [];
      const userId = getState().user?.id || localStorage.getItem("userId");
      setLoading(true);
      console.log(userId, "KJDUIDUIS");
      const resData = await Bank.getUserBanksById(userId);
      for (let bank of resData) {
        const newBank = new Bank(
          bank.bank_name,
          bank.account_number,
          bank.account_name,
          userId,
          bank.id
        );
        banks.push(newBank);
      }
      console.log(userId, banks, "KJDUIDUIS");
      dispatch({
        type: DISPATCH_ACTIONS.ADD_BANK,
        payload: {
          banks: banks,
          message: {
            type: ErrorType.SUCCESS,
            header: "Success",
            content: "Bank added successfully",
          },
        },
      });
      setLoading(false);
    } catch (error: any) {
      alert(error.message);
      dispatch({
        type: DISPATCH_ACTIONS.SET_MESSAGE,
        payload: {
          message: {
            type: ErrorType.ERROR,
            header: "Something went wrong",
            content: error.message,
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };
}

export function editBank(
  state: BankState,
  setLoading: Function,
  router: NextRouter,
  bankId: number
) {
  return async (dispatch: any, getState: any) => {
    try {
      console.log(state);
      const userId = getState().user?.id || localStorage.getItem("userId");
      setLoading(true);
      const bank = new Bank(
        state.bankName,
        state.accountNumber,
        state.accountName,
        userId,
        bankId
      );
      const resData = await bank.editBank();
      console.log(resData);
      dispatch({
        type: DISPATCH_ACTIONS.SET_MESSAGE,
        payload: {
          message: {
            type: ErrorType.SUCCESS,
            header: "Operation Success",
            content: "Bank Edited successfully",
          },
        },
      });
      setLoading(false);
      alert("Bank Edited successfully");
      router.replace("/user/bank");
    } catch (error: any) {
      alert(error.message);
      dispatch({
        type: DISPATCH_ACTIONS.SET_MESSAGE,
        payload: {
          message: {
            type: ErrorType.ERROR,
            header: "Something went wrong",
            content: error.message,
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };
}

export async function getButRate(amountInNaira: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/xendBridge/buyRate/NGN/BUSD/${amountInNaira}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const resData = await res.json();
    return resData.data.data;
  } catch (e) {
    throw e;
  }
}

export async function getSellRate(amountInBUSD: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/xendBridge/sellRate/BUSD/NGN/${amountInBUSD}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const resData = await res.json();
    return resData.data.data;
  } catch (e) {
    throw e;
  }
}

export async function getCurrencies(type: string) {
  try {
    let currencies: Currency[] = [];
    const res = await fetch(`${BASE_URL}/getCurrency/${type}`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const resData = await res.json();
    for (let curr of resData.data) {
      currencies.push({
        id: curr.id,
        name: curr.name,
        type: curr.type,
      });
    }
    return currencies;
  } catch (e) {
    throw e;
  }
}

export function initOrder(state: OrderState, setLoading: Function) {
  return async (dispatch: any, getState: any) => {
    try {
      if (state.orderType === "") {
        throw new Error("Order type is required");
      }
      console.log(state);
      const userId = getState().user?.id || localStorage.getItem("userId");
      setLoading(true);
      const res = await fetch(`${BASE_URL}/xendBridge/initiate`, {
        headers: HEADERS,
        method: "POST",
        body: JSON.stringify({
          userId: userId.toString(),
          bankId: state.bankId,
          amount: +state.amount,
          payInCurrencyCode: +state.payInCurrency,
          receiveInCurrencyCode: +state.receiveInCurrency,
          walletAddress: state.walletAddress,
          orderType: +state.orderType,
        }),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const resData = await res.json();
      console.log(resData);
      setLoading(false);
      dispatch({
        type: DISPATCH_ACTIONS.SET_MESSAGE,
        payload: {
          message: {
            type: ErrorType.SUCCESS,
            header: "Operation Success",
            content: "Order initiated successfully",
          },
        },
      });
      alert("Order initiated successfully");
    } catch (error: any) {
      alert(error.message);
      dispatch({
        type: DISPATCH_ACTIONS.SET_MESSAGE,
        payload: {
          message: {
            type: ErrorType.ERROR,
            header: "Something went wrong",
            content: error.message,
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };
}

export function autoAuth(userId: string, setLoading: Function) {
  return async (dispatch: any) => {
    try {
      setLoading(true);
      const user = await User.getUserById(userId);
      dispatch({
        type: DISPATCH_ACTIONS.REGISTER_USER,
        payload: {
          user,
          message: {
            type: ErrorType.SUCCESS,
            header: "Success",
            content: "User registered successfully",
          },
        },
      });
      setLoading(false);
    } catch (error: any) {
      alert(error.message);
      dispatch({
        type: DISPATCH_ACTIONS.SET_MESSAGE,
        payload: {
          message: {
            type: ErrorType.ERROR,
            header: "Something went wrong",
            content: error.message,
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };
}

export async function getPendingOrder(email: string, setLoading: Function) {
  try {
    let order: Order | null = null;
    setLoading(true);
    const res = await fetch(`${BASE_URL}/xendBridge/getPendingOrder/${email}`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const resData = await res.json();
    console.log(resData);
    if (resData.data.id) {
      order = {
        id: resData.data.id,
        email: resData.data.customer_email,
        orderType: resData.data.order_type,
        orderAmount: resData.data.order_amount,
        bankId: resData.data.bank_detail_id,
        userId: resData.data.xend_bridge_user_id,
        details: {
          payInCurr: resData.data.pay_in_currency_code,
          receiveAmount: resData.data.receivable_amount,
          receiveInCurr: resData.data.receive_in_currency_code,
          wallet: resData.data.wallet_address,
          trasactionRef: resData.data.transaction_ref,
          xb_transactionRef: resData.data.xend_bridge_transaction_ref,
        },
      };
    }
    setLoading(false);
    return order;
  } catch (error: any) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
}

export function confirmOrder(transactionId: string, setLoading: Function) {
  return async (dispatch: any) => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/xendBridge/confirmPayment`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
          transactionId: transactionId,
        }),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const resData = await res.json();
      console.log(resData);

      dispatch({
        type: DISPATCH_ACTIONS.SET_MESSAGE,
        payload: {
          message: {
            type: ErrorType.SUCCESS,
            header: "Success",
            content: "Confirm Order Success",
          },
        },
      });
    } catch (error: any) {
      alert(error.message);
      dispatch({
        type: DISPATCH_ACTIONS.SET_MESSAGE,
        payload: {
          message: {
            type: ErrorType.ERROR,
            header: "Something went wrong",
            content: error.message,
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };
}

export function cancelOrder(transactionId: string, setLoading: Function) {
  return async (dispatch: any) => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/xendBridge/cancelOrder`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
          transactionId: transactionId,
        }),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const resData = await res.json();
      console.log(resData);

      dispatch({
        type: DISPATCH_ACTIONS.SET_MESSAGE,
        payload: {
          message: {
            type: ErrorType.SUCCESS,
            header: "Success",
            content: "Concel Order Success",
          },
        },
      });
    } catch (error: any) {
      alert(error.message);
      dispatch({
        type: DISPATCH_ACTIONS.SET_MESSAGE,
        payload: {
          message: {
            type: ErrorType.ERROR,
            header: "Something went wrong",
            content: error.message,
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };
}
