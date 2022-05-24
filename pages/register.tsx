import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter} from "next/router";
import Animate from "../components/Animate";
import Logo from "../components/Logo";

// import { AppState } from "../store/constants";
import { register } from "../store/actions";

export interface RegisterState {
  email: string;
  username: string;
  phone: string;
}

export default function RegisterForm() {
  const [state, setState] = useState<RegisterState>({
    email: "",
    username: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  function createUser() {
      try {
        if (!state.email || !state.username || !state.phone) {
          throw new Error("Please fill all the fields");
        }
        dispatch(register(state, setLoading, router));
      } catch (error : any) {
          alert(error.message);
      }
  }

  return (
    <div className="login-root">
      <div
        className="box-root flex-flex flex-direction--column"
        style={{ minHeight: "100vh", flexGrow: 1 }}
      >
        <Animate />
        <div
          className="box-root padding-top--24 flex-flex flex-direction--column"
          style={{ flexGrow: 1, zIndex: 9 }}
        >
          <Logo />
          <div className="formbg-outer">
            <div className="formbg">
              <div className="formbg-inner padding-horizontal--48">
                <span className="padding-bottom--15">Create your account</span>
                <div id="stripe-login">
                  <div className="field padding-bottom--24">
                    <label>Email</label>
                    <input
                      value={state.email}
                      onChange={(e) =>
                        setState({ ...state, email: e.target.value })
                      }
                      type="email"
                    />
                  </div>
                  <div className="field padding-bottom--24">
                    <label>Username</label>
                    <input
                      value={state.username}
                      onChange={(e) =>
                        setState({ ...state, username: e.target.value })
                      }
                      type="text"
                    />
                  </div>
                  <div className="field padding-bottom--24">
                    <label>Phone</label>
                    <input
                      value={state.phone}
                      onChange={(e) =>
                        setState({ ...state, phone: e.target.value })
                      }
                      type="tel"
                    />
                  </div>
                  <div className="field padding-bottom--24">
                    <button onClick={createUser} className="btn">{loading ?  "Please Wait" : "Register" }</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
