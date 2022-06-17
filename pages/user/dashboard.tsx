import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import BankNotic from "../../components/BankNotic";

import { autoAuth, getPendingOrder, getUserBanks, confirmOrder, cancelOrder } from "../../store/actions";
import { AppState, Order } from "../../store/constants";
import OrderCard from "../../components/OrderCard";
import Orderdetails from "../../components/OrderDetails";
export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState<Order | null | undefined>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  const banks = useSelector((state: AppState) => state.banks);
  useEffect(() => {
    if (user) {
      if (banks.length > 0){
        return
      }
      dispatch(getUserBanks(setLoading))
      return;
    }
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.replace("/register");
      return;
    }
    autoAuthFn(userId);
  }, [user]);
  useEffect(() => {
    getPendingOrderFn();
  }, [user]);
  function confirmOrderFn(){
    try {
      if (order){
        const areYouSure = confirm('Are you sure you want to pay this Order?')
        if (areYouSure){
          dispatch(confirmOrder(order.id.toString(), setModalLoading))
        }
      }
    } catch ( e: any) {
      alert(e.message)
    }
  }
  function cancelOrderFn(){
    try {
      if (order){
        const areYouSure = confirm('Are you sure you want to cancel this Order?')
        if (areYouSure){
          dispatch(cancelOrder(order.id.toString(), setLoading))
        }
      }
    } catch ( e: any) {
      alert(e.message)
    }
  }
  async function getPendingOrderFn() {
    try {
      if (user) {
        
        const fetchedOrder = await getPendingOrder(user.email, setLoading);
        setOrder(fetchedOrder);
      }
    } catch (error) {
      alert(error);
    }
  }
  function autoAuthFn(userId: string) {
    try {
      dispatch(autoAuth(userId, setLoading));
    } catch (error: any) {
      alert(error.message);
    }
  }
  return (
    <>
      <Nav page="dashboard" />
      {order && (
        <Orderdetails
          showModal={showModal}
          order={order}
          closeModal={() => setShowModal(false)}
          loading={modalLoading}
          orderBank= {banks.length > 0 ? banks.find(bank => bank.id === order.bankId) : null}
          onConfirmOrder={confirmOrderFn}
        />
      )}

      <div className="container">
        <h1 style={{margin: '15px 0'}}>Hello, {user?.userName}</h1>
        {banks.length <= 0 && <BankNotic />}
        <h4 style={{margin: '15px 0'}}>Pending Order</h4>
        {order ? <OrderCard loading = {loading} cancelOrder={cancelOrderFn} showViewModal={() => setShowModal(true)} order={order} /> : <p>No Order to Show</p>}
      </div>
    </>
  );
}
