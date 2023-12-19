import { useState } from "react";
import "./CartProduct.css";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  incCart,
  decCart,
  removeCart,
  clearCart,
} from "../../context/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate} from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";

const BOT_TOKEN = "6697346469:AAF_WLrIJYyCt_KgAC7lP-YSeSJa_oZVsNI";
const CHAT_ID = "-1001999937730";
// https://api.telegram.org/bot6697346469:AAF_WLrIJYyCt_KgAC7lP-YSeSJa_oZVsNI/getUpdates

export default function CartProduct({ data, staticData }) {
  const dispatch = useDispatch();
  const totalSum = data.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const navigate = useNavigate();
  const totalProduct = data.reduce((acc, product) => acc + product.quantity, 0);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    let order = "<b>Buyurtma:</b> %0A";
    order += `<b>Ism va Familiya:</b> ${fullName} %0A`;
    order += `<b>Telefon nomer:</b> ${phoneNumber} %0A`;
    order += `<b>Manzil:</b> ${address} %0A`;
    order += `<b>Xabar</b>: ${message || "yoq"} %0A%0A`;
    data.forEach((el, act) => {
      order += `<b>${act + 1}-chi maxsulot</b> %0A`;
      order += `<b>Nomi</b>: ${el.title} s'om %0A`;
      order += `<b>Narxi</b>: ${el.price.brm()} %0A`;
      order += `<b>Miqdori</b>: ${el.quantity} %0A%0A`;
    });
    order += `<b>Jami</b>: ${totalSum.brm()} so'm %0A%0A`;

    const URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${order}&parse_mode=html`;
    axios
      .post(URL)
      .then((res) => {
        dispatch(clearCart(data));
        navigate("/");
      })
      .catch((err) =>
        toast.error("Nimadir xato ketdi", {
          position: "top-center",
          autoClose: 2500,
        })
      );
  };

  return (
    <>
      <div className="cart__wrapper">
        <div className="cart_cover">
          <div className="cart__products">
            {data?.map((el) => (
              <div key={el.id} className="cart__item">
                <img src={el.url} onClick={() => {
                  navigate(`/single-page/${el.id}`)
                }}/>
                <div className="cart__text_counter">
                  <div className="cart__text_counter_top">
                    <div  className="title" onClick={() => navigate(`/single-page/${el.id}`) }>
                      <p>{el.title}</p>
                    </div>
                    <div
                      onClick={() => dispatch(removeCart(el))}
                      className="clear"
                    >
                      <FaRegTrashCan />
                      <span>Ochirish</span>
                    </div>
                  </div>
                  <div className="cart__text_counter_bottom">
                    <div className="kategoriya">
                      <span>Kategoriya:</span> <p>{el.category}</p>
                    </div>
                    <div className="numbers">
                      <div className="counter">
                        <button
                          disabled={el.quantity <= 1}
                          onClick={() => dispatch(decCart(el))}
                        >
                          -
                        </button>
                        <span>{el.quantity}</span>
                        <button onClick={() => dispatch(incCart(el))}>+</button>
                      </div>
                      <div className="price">
                        <p>{(el.price * el.quantity)?.brm()} so'm</p>
                        <del>{(el.price * 1.2 * el.quantity)?.brm()} so'm</del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cart_register">
          <h2>Buyurtmangiz</h2>
          <div className="all__products">
            <span>Maxsulotlar ({totalProduct.brm()}):</span>
            <p>Jami: {totalSum.brm()} so'm</p>
          </div>
          <form onSubmit={handleClick} className="confirm__order">
            <input
              type="text"
              placeholder="Ism va Familiya"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="+998 99 999 99 99"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Manzil"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Massage"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button>Sotib olish</button>
          </form>
        </div>
      </div>
      <div className="products_before_cart"></div>
    </>
  );
}
