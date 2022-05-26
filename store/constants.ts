import Bank from "../models/bank";
import User from "../models/user";

export const BASE_URL = "https://e100-94-79-68-96.eu.ngrok.io";
export const HEADERS = {
    "Content-Type": "application/json",
  // "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "POST, GET",
//   "Accept": "*/*",
//   "Accept-Encoding": "gzip, deflate, br",
//   "Connection": "keep-alive",
  //   "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
  //   "Access-Control-Allow-Methods": "POST",
  //   "Access-Control-Allow-Headers": "Content-Type",
};

export enum ErrorType {
  SUCCESS,
  NONE,
  ERROR,
}

export type Currency = {
  id: number;
  name: string;
  type: string;
}
type OrderDetails = {
  trasactionRef: string;
  xb_transactionRef: string;
  payInCurr: number
  receiveInCurr: number
  receiveAmount: number
  wallet: string
}

export interface Order {
  id: number;
  email: string;
  orderAmount: number;
  userId: number;
  bankId: number;
  orderType: number
  details: OrderDetails;
} 
export enum OrderType {
  NONE, BUY, SELL
}
export interface MessageType {
  type: ErrorType;
  header: string;
  content: string;
}

export interface AppState {
  user: User | null;
  banks: Bank[]
  message: MessageType | null;
}

export interface Action {
  type: string;
  payload: AppState;
}

export const DISPATCH_ACTIONS = {
  REGISTER_USER: "REGISTER_USER",
  SET_MESSAGE: "SET_MESSAGE",
  ADD_BANK: "ADD_BANK"
};
