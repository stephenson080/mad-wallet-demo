import Bank from "../models/bank";
type Prop = {
  banks: Bank[];
  initEditBank: (bank: Bank) => void
};
export default function Banks(props: Prop) {
  return (
    <table id="customers">
      <tr>
        <th>S/N</th>
        <th>Bank Name</th>
        <th>Account Name</th>
        <th>Account Number</th>
        <th></th>
      </tr>
      {props.banks.length === 0 && (
              <tr><td>No Bank Accout to show</td></tr>
      )}
      {props.banks.map((bank, index) => {
        return (
          <tr key = {index}>
            <td>{++index}</td>
            <td>{bank.bankName}</td>
            <td>{bank.accountName}</td>
            <td>{bank.accountNumber}</td>
            <td><button onClick={() => props.initEditBank(bank)} className="button primary">Edit Bank</button></ td>
          </tr>
        );
      })}
    </table>
  );
}
