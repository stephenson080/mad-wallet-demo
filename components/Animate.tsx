export default function Animate() {
  return (
    <div className="loginbackground box-background--white padding-top--64">
      <div className="loginbackground-gridContainer">
        <div
          className="box-root flex-flex"
          style={{ gridArea: "top / start / 8 / end" }}
        >
          <div
            className="box-root"
            style={{
              backgroundImage:
                "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
              flexGrow: 1,
            }}
          ></div>
        </div>
        <div
          className="box-root flex-flex"
          style={{ gridArea: "4 / 2 / auto / 5" }}
        >
          <div
            className="box-root box-divider--light-all-2 animationLeftRight tans3s"
            style={{ flexGrow: 1 }}
          ></div>
        </div>
        <div
          className="box-root flex-flex"
          style={{ gridArea: "6 / start / auto / 2" }}
        >
          <div
            className="box-root box-background--blue800"
            style={{ flexGrow: 1 }}
          ></div>
        </div>
        <div
          className="box-root flex-flex"
          style={{ gridArea: "7 / start / auto / 4" }}
        >
          <div
            className="box-root box-background--blue animationLeftRight"
            style={{ flexGrow: 1 }}
          ></div>
        </div>
        <div
          className="box-root flex-flex"
          style={{ gridArea: "8 / 4 / auto / 6" }}
        >
          <div
            className="box-root box-background--gray100 animationLeftRight tans3s"
            style={{ flexGrow: 1 }}
          ></div>
        </div>
        <div
          className="box-root flex-flex"
          style={{ gridArea: "2 / 15 / auto / end" }}
        >
          <div
            className="box-root box-background--cyan200 animationRightLeft tans4s"
            style={{ flexGrow: 1 }}
          ></div>
        </div>
        <div
          className="box-root flex-flex"
          style={{ gridArea: "3 / 14 / auto / end" }}
        >
          <div
            className="box-root box-background--blue animationRightLeft"
            style={{ flexGrow: 1 }}
          ></div>
        </div>
        <div
          className="box-root flex-flex"
          style={{ gridArea: "4 / 17 / auto / 20" }}
        >
          <div
            className="box-root box-background--gray100 animationRightLeft tans4s"
            style={{ flexGrow: 1 }}
          ></div>
        </div>
        <div
          className="box-root flex-flex"
          style={{ gridArea: "5 / 14 / auto / 17" }}
        >
          <div
            className="box-root box-divider--light-all-2 animationRightLeft tans3s"
            style={{ flexGrow: 1 }}
          ></div>
        </div>
      </div>
    </div>
  );
}
