import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banks from "../../components/Banks";

import Modal from "../../components/Modal";
import Nav from "../../components/Nav";
import Bank from "../../models/bank";

import { addBank, getUserBanks, editBank } from "../../store/actions";
import { AppState } from "../../store/constants";

export interface BankState {
  bankName: string;
  accountName: string;
  accountNumber: string;
}
export default function BankDetails() {
  const [state, setState] = useState<BankState>({
    accountName: "",
    bankName: "",
    accountNumber: "",
  });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editBankFlag, setEditBank] = useState(false)
  const [currentBankId, setCurrentBankId] = useState(-1)
  const dispatch = useDispatch();
  const banks = useSelector((state: AppState) => state.banks)
  const router = useRouter();

  useEffect(() => {
      try {
          dispatch(getUserBanks(setLoading))
      } catch (error) {
          console.log(error);
      }
          
  }, [])


  async function addBankFn() {
    try {
      dispatch(addBank(state, setLoading, router));
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function editBankFn() {
    try {
      dispatch(editBank(state, setLoading, router, currentBankId));
    } catch (error: any) {
      alert(error.message);
    }
  }

  function initEditBank(bank: Bank) {
    setShow(true);
    setEditBank(true);
    setCurrentBankId(bank.id!)
    setState({
        accountName: bank.accountName,
        bankName: bank.bankName,
        accountNumber: bank.accountNumber,
    })
  }
  return (
    <>
      <Nav page = 'banks' />
      <Modal
        loading={loading}
        onSubmit={editBankFlag ? editBankFn : addBankFn}
        closeModal={() => setShow(false)}
        show={show}
        title={editBankFlag ? "Edit Bank" : "Add new Bank"}
      >
        <div>
          <p style={{ marginBottom: "30px" }}>Fill the form to {editBankFlag ? "Edit" : "Add"} bank</p>
          <form
            style={{
              width: "100%",
            }}
          >
            <div className="form-field">
              <label>Bank Name</label>
              <input
                value={state.bankName}
                onChange={(e) =>
                  setState({ ...state, bankName: e.target.value })
                }
              />
            </div>
            <div className="form-field">
              <label>Account name</label>
              <input
                value={state.accountName}
                onChange={(e) =>
                  setState({ ...state, accountName: e.target.value })
                }
              />
            </div>
            <div className="form-field">
              <label>Account Number</label>
              <input
                value={state.accountNumber}
                onChange={(e) =>
                  setState({ ...state, accountNumber: e.target.value })
                }
              />
            </div>
          </form>
        </div>
      </Modal>
      <div className="container">
        <h1>My Banks</h1>
        <div
          style={{
            width: "100%",
            margin: "20px 0",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <button
            style={{
              marginLeft: "auto",
              backgroundColor: "blue",
              padding: "8px 15px",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            disabled={loading}
            onClick={() => {
                setShow(true)
                setEditBank(false)
            }}
          >
            {loading ? "Please Wait" : "Add Bank"}
          </button>
        </div>
        <Banks initEditBank={initEditBank} banks = {banks}/>
      </div>
    </>
  );
}
