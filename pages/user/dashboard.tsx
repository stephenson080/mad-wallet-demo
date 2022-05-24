import {useSelector} from 'react-redux'
import Nav from "../../components/Nav";
import BankNotic from "../../components/BankNotic";

import {AppState} from '../../store/constants'
export default function Dashboard() {
  
  const user = useSelector((state: AppState) => state.user)
  return (
    <>
      <Nav  page = 'dashboard' />
      <div className="container">
        <h1>Hello, {user?.userName}</h1>
        <BankNotic />
        
      </div>
    </>
  );
}
