import Link from "next/link";


export default function BankNotic () {
    return (
        <div
          style={{
            display: "flex",
            margin: "25px 0",
            flexDirection: "row",
            border: "2px solid blue",
            padding: "10px 15px",
            alignItems: 'center'
          }}
        >
          <p>you haven't added any bank yet</p>
          <Link href={"/user/bank"}>
            <button
              style={{
                marginLeft: "auto",
                backgroundColor: "blue",
                padding: "8px 15px",
                color: "white",
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Add Bank
            </button>
          </Link>
        </div>
    )
}