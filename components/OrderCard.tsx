import { Order } from "../store/constants";

type Props = {
  order: Order
  showViewModal : ()=> void
  cancelOrder?: () => void
  loading: boolean,
  isForTransactions?: boolean
};

export default function OrderCard(props: Props) {
  return (
    <table id="customers">
      <tr>
        <th>Transaction ID</th>
        <th>Order Type</th>
        <th>Customer Email</th>
        <th>Amount</th>
        <th></th>
        {!props.isForTransactions && <th></th>}
      </tr>
        <tr>
          <td>{props.order.id}</td>
          <td>{props.order.orderType === 1 ? "BUY" : "SELL"}</td>
          <td>{props.order.email}</td>
          <td>{props.order.orderAmount}</td>
          <td>
            <button disabled = {props.loading} onClick={props.showViewModal} className="button primary">{!props.loading ? "View Order" : "Please Wait..."}</button>
          </td>
          {!props.isForTransactions && <td>
            <button disabled = {props.loading} onClick={props.cancelOrder} className="button danger">{!props.loading ? "Cancel Order" : "Please Wait..."}</button>
          </td>}
        </tr>
    </table>
  );
}
