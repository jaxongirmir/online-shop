import { useState } from "react";
import "./Products.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishes } from "../../context/wishesSlice";
import { incCart } from "../../context/cartSlice";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";

const AMOUNT = 10

function Products({ data }) {
  const [scale, setScale] = useState("");
  const dispatch = useDispatch();
  const wishes = useSelector((s) => s.wishes.value);
  const navigate = useNavigate()
  const [count, setCount] = useState(1)
  const handleClick = (el) => {
    dispatch(toggleWishes(el));
    setScale("scale");
  };
  const cartClick = (el) => {
    dispatch(incCart(el));
    toast.success('maxsulot savatga qoshildi', {
      position: "top-center",
    })
  };
    const imgClick = (el) => {
      navigate(`/single-page/${el.id}`)
    }
  return (
    <>
    <div className="products__wrapper">
      {data?.slice(0, AMOUNT * count).map((el) => (
        <div key={el.id} className="products__card">
          <div onClick={() => imgClick(el)} className="products__image">
            <img src={el.url} alt="" />
          </div>
          <div className="products__body">
            <p className="products__title">{el.title}</p>
            <div style={{ flex: 1 }}>
              <span className="products__monthly">
                {((el.price * 1.5) / 12)?.brm()} so'm/oyiga
              </span>
            </div>
            <del>{(el.price * 1.2)?.brm()} so'm</del>
            <p className="products__price">{el.price?.brm()} so'm</p>
          </div>
          <div
            onClick={() => handleClick(el)}
            className={`products__wishes ${scale}`}
          >
            {!wishes?.some((item) => item.id === el.id) ? (
              <FaRegHeart />
            ) : (
              <FaHeart style={{ color: "var(--bg-py)" }} />
            )}
          </div>
          <div onClick={() => cartClick(el)} className="products__cart">
            <IoCartOutline />
          </div>
        </div>
      ))}
    </div>
    {
      data.length > count * AMOUNT ?
      <button onClick={() => setCount(p => p + .5)}>Koproq korish</button>
      : <></>
    }
    </>
  );
}

export default Products;