type Prop = {
    show: boolean,
    title: string,
    closeModal: () => void
    onSubmit?: () => void
    loading: boolean
    children: any,
    dontShowSubmitBtn? : boolean
}
export default function Modal(props: Prop) {
  return (
    <div id="myModal" className="modal" style={{display: props.show ? "block" : "none"}}>
      <div className="modal-content">
        <div className="modal-header">
          <span onClick={props.closeModal} className="close">&times;</span>
          <h2 style={{color: 'white'}}>{props.title}</h2>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
        <div className="modal-footer">
          <div style={{marginLeft: 'auto'}}>
              <button className="button danger" disabled = {props.loading} onClick = {props.closeModal}>Cancel</button>
              {!props.dontShowSubmitBtn &&<button className="button primary" disabled = {props.loading} onClick={props.onSubmit}>{props.loading ? "Please Wait..." : "Submit"}</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
