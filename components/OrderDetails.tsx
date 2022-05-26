import Modal from "./Modal";
import { Order } from "../store/constants";
import Bank from '../models/bank'
type Props = {
  order: Order;
  showModal: boolean;
  closeModal: () => void;
  onConfirmOrder: () => void;
  loading: boolean
  orderBank: Bank | null | undefined
};
export default function Orderdetails(props: Props) {
  return (
    <Modal
      title="My Order"
      loading={props.loading}
      show={props.showModal}
      closeModal={props.closeModal}
      onSubmit={props.onConfirmOrder}

    >   
        <h3>Customer Info</h3>
        <div className="order-row">
        <p>Customer Email:  <strong>{props.order.email}</strong></p>
        <p>Customer Wallet Add.: <strong>{props.order.details.wallet}</strong></p>
            
        </div>
        <div className="order-row">
            <p>Customer Bank: <strong>{props.orderBank ? props.orderBank.accountName : ''}</strong></p>
            <p>Order Type:  <strong>{props.order.orderType === 1 ? "BUY" : "SELL"}</strong></p>
        </div>
        <h3>Order Details</h3>
        <div className="order-row">
            <p>Transaction ID: <strong>{props.order.id}</strong></p>
            <p>Transaction Ref:  <strong>{props.order.details.trasactionRef}</strong></p>
        </div>
        <div className="order-row">
            <p>Order Amount: <strong>{props.order.orderAmount}</strong></p>
            <p>Recievable Amount:  <strong>{props.order.details.receiveAmount}</strong></p>
        </div>
        
    </Modal>
  );
}
