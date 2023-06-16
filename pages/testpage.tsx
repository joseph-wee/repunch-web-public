import { carts, createOrder, userCheck, userCheck2 } from "../utils/api";
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const testpage = () => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: 20,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
      console.log("Order successful . Your order id is--", orderID);
    }
  }, [success]);

  // useEffect(() => {
  //   // console.log(sessionStorage.getItem("at"));
  //   //// 개인 유저 정보 조회
  //   // userCheck(sessionStorage.getItem("at")).then((res) => {
  //   //   console.log(res.data);
  //   // });
  //   //// 카트에 담기
  //   // carts(sessionStorage.getItem("at"), 0, "ROLL", 1).then((res) => {
  //   //   console.log(res);
  //   // });
  //   // 주문 생성
  //   createOrder(
  //     "ROLL",
  //     0,
  //     1,
  //     1,
  //     0,
  //     1001,
  //     "web",
  //     "webapi",
  //     123456,
  //     "KR",
  //     "안녕구",
  //     "안녕로 11",
  //     "안녕 2층 103호",
  //     "01099088763",
  //     "AIR",
  //     1
  //   ).then((res) => {
  //     console.log(res);
  //   });
  // }, []);

  return (
    <PayPalScriptProvider
      options={{
        "client-id": "",
      }}
    >
      <div>
        <div className="wrapper">
          <div className="product-img">
            <img
              src="https://cdn.pixabay.com/photo/2021/08/15/06/54/sunflower-6546993_1280.jpg"
              alt="SunFlower"
              height="320"
              width="300"
            />
          </div>
          <div className="product-info">
            <div className="product-text">
              <h1>Sunflower</h1>
            </div>
            <div className="product-price-btn">
              <p>$20</p>
              <br></br>
              <button
                className="buy-btn"
                type="submit"
                onClick={() => setShow(true)}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
        <br></br>
        {show ? (
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        ) : null}
      </div>
    </PayPalScriptProvider>
  );
};

export default testpage;
