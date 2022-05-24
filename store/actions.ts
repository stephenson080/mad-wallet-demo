import { NextRouter } from "next/router";
import User from "../models/user";
import Bank from "../models/bank";
import { RegisterState } from "../pages/register";
import { BASE_URL, DISPATCH_ACTIONS, ErrorType, HEADERS } from "./constants";
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

export function initOrder(state: OrderState, setLoading: Function) {
  return async (dispatch: any, getState: any) => {
    try {
      if (state.orderType === "") {
        throw new Error("Order type is required");
      }
      console.log(state);
      const userId = getState().user?.id || localStorage.getItem("userId");
      console.log(userId)
      setLoading(true);
      const res = await fetch(`${BASE_URL}/xendBridge/initiate`, {
        headers: HEADERS,
        method: "POST",
        body: JSON.stringify({
          userId: userId.toString(),
          bankId: state.bankId,
          amount: +state.amount,
          payInCurrencyCode: state.orderType === "1" ? 1 : 6,
          receiveInCurrencyCode: state.orderType === "1" ? 6 : 1,
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
            type: ErrorType.ERROR,
            header: "Something went wrong",
            content: '',
          },
        },
      });
      alert("Bank Edited successfully");
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