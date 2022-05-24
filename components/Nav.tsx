import Link from "next/link";
import Logo from "./Logo";

type Props = {
  page: string
}

export default function Nav(props : Props) {
  return (
    <div className="topnav" id="myTopnav">
      <Link href={'/user/dashboard'}><a href="/user/dashboard" className={props.page === 'dashboard' ? 'active': ''}>
        Dashboard
      </a>
      </Link>
      <div className="dropdown">
        <button className= {props.page === 'orders' ? 'active  dropbtn': ' dropbtn'}>
        Orders
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <Link href={`/user/orders/initiate-order`}><a href="/user/orders/initiate-order">Initiate Buy or Send</a></Link>
          <Link href = {`/user/orders/pending-orders`}><a href="/user/orders/pending-orders">Pending Order</a></Link>
        </div>
      </div>
      <Link href={`/user/bank`}><a className={props.page === 'banks' ? 'active': ''} href="/user/bank">My Bank</a></Link>
      <a className={props.page === 'transactions' ? 'active': ''} href="#about">Transactions</a>
    </div>
  );
}
