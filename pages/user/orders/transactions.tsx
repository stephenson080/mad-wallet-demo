import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Nav from "../../../components/Nav";
import { autoAuth } from "../../../store/actions";
import { AppState } from "../../../store/constants";
export default function MyTransactions() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);

  useEffect(() => {
    if (user) {
      return;
    }
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.replace("/register");
      return;
    }
    autoAuthFn(userId);
  }, [user]);

  function autoAuthFn(userId: string) {
    try {
      dispatch(autoAuth(userId, setLoading));
    } catch (error: any) {
      alert(error.message);
    }
  }
  return (
    <>
      <Nav page="orders" />
      <div className="container"></div>
    </>
  );
}
