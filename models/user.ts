import { BASE_URL, HEADERS } from "../store/constants";

class User {
  constructor(
    public userName: string,
    public email: string,
    public phoneNumber: string,
    public id? : string,
  ) {}
  public async registerUser() {
    try {
      const res = await fetch(`${BASE_URL}/xendBridgeUser/add`, {
        headers: HEADERS,
        method: "POST",
        body: JSON.stringify({
            phoneNumber: this.phoneNumber,
            userName: this.userName,
            email: this.email
        }),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const resData = await res.json();
      return resData.data;
    } catch (error) {
      throw error;
    }
  }
}

export default User;
