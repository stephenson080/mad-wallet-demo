import { Order } from "../store/constants";

type Props = {
  order: Order
  showViewModal : ()=> void
  cancelOrder: () => void
};

export default function pendingOrder(props: Props) {
  return (
    <table id="customers">
      <tr>
        <th>Transaction ID</th>
        <th>Order Type</th>
        <th>Customer Email</th>
        <th>Amount</th>
        <th></th>
        <th></th>
      </tr>
        <tr>
          <td>{props.order.id}</td>
          <td>{props.order.orderType === 1 ? "BUY" : "SELL"}</td>
          <td>{props.order.email}</td>
          <td>{props.order.orderAmount}</td>
          <td>
            <button onClick={props.showViewModal} className="button primary">View Order</button>
          </td>
          <td>
            <button onClick={props.cancelOrder} className="button danger">Cancel Order</button>
          </td>
        </tr>
    </table>
  );
}
