import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Nav from "../../../components/Nav";
import { autoAuth, getTransactions, getUserBanks } from "../../../store/actions";
import { AppState, Order } from "../../../store/constants";
import OrderCard from "../../../components/OrderCard";
import OrderDetails from '../../../components/OrderDetails'
export default function MyTransactions() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[] | undefined>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | undefined>(undefined)
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
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

  function showTransDetails(orderIndex: number){
    if (orders){
      setCurrentOrder(orders[orderIndex])
      setShowModal(true)
    }
    
  }

  function autoAuthFn(userId: string) {
    try {
      dispatch(autoAuth(userId, setLoading));
    } catch (error: any) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getAllTransactions();
  }, [user]);

  async function getAllTransactions() {
    try {
      if (user) {
        const fetchedOrders = await getTransactions(user.email, setLoading);
        setOrders(fetchedOrders);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <Nav page="orders" />
      {currentOrder && (
        <OrderDetails
          showModal={showModal}
          order={currentOrder}
          dontShowSubmitBtn
          closeModal={() => setShowModal(false)}
          loading={modalLoading}
          orderBank= {banks.length > 0 ? banks.find(bank => bank.id === currentOrder.bankId) : null}
          
        />
      )}
      <div className="container">
        <h3 style={{margin: '15px 0'}}>Your Transactions</h3>
        {orders && orders.length > 0 ? (
          orders.map((order, i) => (
            <OrderCard
              isForTransactions
              key={i}
              loading={loading}
              showViewModal={() => showTransDetails(i)}
              order={order}
            />
          ))
        ) : (
          <p>No Order to Show</p>
        )}
      </div>
    </>
  );
}
