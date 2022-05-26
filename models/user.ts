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

  public static async getUserById(userId : string){
    try {
      let user : User | null = null
      while(true){
        let page = 1
        let res = await fetch(`${BASE_URL}/xendBridgeUser/all/${page}/10`);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const resData = await res.json();
        
        if (resData.data.data.length === 0) {
          break
        }
        let fetchedUser = resData.data.data.find((u: { id: number; }) => u.id === parseInt(userId))
        if (fetchedUser){
          user = new User(fetchedUser.user_name, fetchedUser.email, fetchedUser.phone_number, fetchedUser.id)
          break
        } 
        page++

      }
      return user
    } catch (error) {
      throw error;
    }
  }
}

export default User;
