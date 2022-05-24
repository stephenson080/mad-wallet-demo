import {HEADERS, BASE_URL} from '../store/constants'
class Bank {
  constructor(
    public bankName: string,
    public accountNumber: string,
    public accountName: string,
    public userId: string,
    public id?: number
  ) {}

  public async  addBank (userId: string) {
    try {
      const res = await fetch(`${BASE_URL}/bank/add`, {
        headers: HEADERS,
        method: "POST",
        body: JSON.stringify({
            bankName: this.bankName,
            accountName: this.accountName,
            accountNumber: this.accountNumber,
            userId: userId
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
  public static async getUserBanksById(userId: string) {
    try {
      const res = await fetch(`${BASE_URL}/bank/${userId}`, {
        headers: HEADERS,
        method: "GET",
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
  public async editBank() {
    const res = await fetch(`${BASE_URL}/bank/update/${this.id!.toString()}`, {
      headers: HEADERS,
      method: "PUT",
      body: JSON.stringify({
        bankName: this.bankName,
        accountName: this.accountName,
        accountNumber: this.accountNumber,
    }),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const resData = await res.json();
    return resData.data;
  } catch (error : any) {
    throw error;
  }
}

export default Bank;
