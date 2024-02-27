import { useEffect, useState } from "react";
import sidebarmenu from "./assets/sidebar-home.svg";
import sidebarlogo from "./assets/sidebar-logo.svg";
import discount from "./assets/sidebar-chegirma.svg";
import stat from "./assets/sidebar-stat.svg";
import message from "./assets/sidebar-message.svg";
import notification from "./assets/sidebar-noti.svg";
import quit from "./assets/sidebar-quit.svg";
import search from "./assets/search.svg";
import del from "./assets/delete-btn.svg";
import settings from "./assets/sidebar-settings.svg";
import home from "./assets/home-img-nothover.svg";
import settinghover from "./assets/settings-hover.svg";
import heart from "./assets/heart.svg";
import filter from "./assets/filter.svg";
import "./App.css";

function App() {
  const [menu, setMenu] = useState(1);
  const [section, setSection] = useState(1);
  const pizzaze = () => {
    setMenu(1);
  };
  const lavashe = () => {
    setMenu(2);
  };

  const salate = () => {
    setMenu(3);
  };

  const ichimlike = () => {
    setMenu(4);
  };

  const burgere = () => {
    setMenu(5);
  };

  const shirinlike = () => {
    setMenu(6);
  };
  const bugun = new Date();
  const sana = bugun.getDate();
  const oy = bugun.toLocaleString("en-Us", { month: "long" });
  const yil = bugun.getFullYear();

  const haftaKuni = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];
  const kunIndex = bugun.getDay();
  const kun = haftaKuni[kunIndex];

  const [pizza, setPizza] = useState([]);
  console.log(pizza);
  useEffect(() => {
    fetch("http://localhost:3000/Pitsalar")
      .then((res) => res.json())
      .then((data) => setPizza(data));
  }, []);

  const [lavash, setLavash] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/Lavashlar")
      .then((res) => res.json())
      .then((data) => setLavash(data));
  }, []);

  const [salat, setSalat] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/salatlar")
      .then((res) => res.json())
      .then((data) => setSalat(data));
  }, []);

  const [ichimlik, setIchimlik] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/ichimliklar")
      .then((res) => res.json())
      .then((data) => setIchimlik(data));
  }, []);

  const [burger, setBurger] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/burgervahotdoglar")
      .then((res) => res.json())
      .then((data) => setBurger(data));
  }, []);

  const [shirinlik, setShirinlik] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/shirinliklar")
      .then((res) => res.json())
      .then((data) => setShirinlik(data));
  }, []);

  const [selectedItems, setSelectedItems] = useState([]);

  const [quantity, setQuantity] = useState(0);
  const [orders, setOrders] = useState([]);

  // ... other functions ...

  const removeFromOrders = (itemId) => {
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const updatedOrders = existingOrders.filter(
      (orderItem) => orderItem.id !== itemId
    );

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders); // Update state
  };

  const addToOrders = (item) => {
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const existingItem = existingOrders.find(
      (orderItem) => orderItem.id === item.id
    );

    if (existingItem) {
      const updatedOrders = existingOrders.map((orderItem) =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setOrders(updatedOrders); // Update state
    } else {
      const newOrders = [...existingOrders, { ...item, quantity: 1 }];
      localStorage.setItem("orders", JSON.stringify(newOrders));
      setOrders(newOrders); // Update state
    }
  };

  const calculateTotalPrice = () => {
    return orders.reduce(
      (total, orderItem) => total + orderItem.price * orderItem.quantity,
      0
    );
  };

  const setting = () => {
    setSection(2);
    const img = document.getElementById("settingimg");
    const imghover = document.getElementById("settinghover");
    const imghovere = document.getElementById("settinghovere");
    const menu = document.getElementById("menuu");

    img.style.display = "none";
    menu.style.display = "none";
    imghover.style.display = "block";
    imghovere.style.display = "block";
  };

  const mainmenu = () => {
    const img = document.getElementById("settingimg");
    const imghover = document.getElementById("settinghover");
    const imghovere = document.getElementById("settinghovere");
    const menu = document.getElementById("menuu");
    imghovere.style.display = "none";
    menu.style.display = "block";
    imghover.style.display = "none";
    img.style.display = "block";
    setSection(1);
  };
  return (
    <>
      <div>
        <div className="container">
          <header>
            <div className="sidebar">
              <a href="#">
                <img src={sidebarlogo} alt="" />
              </a>
              <a onClick={mainmenu} href="#">
                <img id="menuu" src={sidebarmenu} alt="" />
                <img id="settinghovere" className="hidden" src={home} alt="" />
              </a>
              <a href="#">
                <img src={discount} alt="" />
              </a>
              <a href="#">
                <img src={stat} alt="" />
              </a>
              <a href="#">
                <img src={message} alt="" />
              </a>
              <a href="#">
                <img src={notification} alt="" />
              </a>
              <a href="#">
                <img id="settingimg" onClick={setting} src={settings} alt="" />
                <img
                  id="settinghover"
                  className="hidden"
                  src={settinghover}
                  alt=""
                />
              </a>
              <a href="#">
                <img src={quit} alt="" />
              </a>
            </div>

            {section == 1 && (
              <div className="header__one">
                <div className="menu">
                  <div className="top">
                    <div className="top__fix">
                      <div className="menu__top">
                        <div className="menu__top-left">
                          <h1>Salimov To'lqin</h1>
                          <h3>
                            {kun}, {sana} {oy} {yil}
                          </h3>
                        </div>

                        <div className="menu__top-right">
                          <label htmlFor="foodsearch">
                            <img src={search} alt="" />
                            <input
                              id="foodsearch"
                              type="text"
                              placeholder="Taom qidirish, kofe, etc.."
                            />
                          </label>
                        </div>
                      </div>

                      <div className="foods__menu">
                        <ul>
                          <li>
                            <a onClick={pizzaze} href="#">
                              Pitsalar
                            </a>
                          </li>
                          <li>
                            <a onClick={lavashe} href="#">
                              Lavashlar
                            </a>
                          </li>
                          <li>
                            <a onClick={salate} href="#">
                              Salatlar
                            </a>
                          </li>
                          <li>
                            <a onClick={ichimlike} href="#">
                              Ichimliklar
                            </a>
                          </li>
                          <li>
                            <a onClick={burgere} href="#">
                              Burgerlar
                            </a>
                          </li>
                          <li>
                            <a onClick={shirinlike} href="#">
                              Shirinliklar
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="foods__top flex justify-between mr-10 mt-12">
                        {menu == 1 && (
                          <h1 className=" text-white text-2xl font-poppins font-medium">
                            Pitsa tanlash
                          </h1>
                        )}
                        {menu == 2 && (
                          <h1 className=" text-white text-2xl font-poppins font-medium">
                            Lavash tanlash
                          </h1>
                        )}
                        {menu == 3 && (
                          <h1 className=" text-white text-2xl font-poppins font-medium">
                            Salat tanlash
                          </h1>
                        )}
                        {menu == 4 && (
                          <h1 className=" text-white text-2xl font-poppins font-medium">
                            Ichimlik tanlash
                          </h1>
                        )}
                        {menu == 5 && (
                          <h1 className=" text-white text-2xl font-poppins font-medium">
                            Burger tanlash
                          </h1>
                        )}
                        {menu == 6 && (
                          <h1 className=" text-white text-2xl font-poppins font-medium">
                            Shirinlik tanlash
                          </h1>
                        )}
                        <select
                          className=" border-none outline-none bg-slate-900	text-white pl-3 pr-3 p-1 font-poppins font-medium"
                          name="type"
                          id="type"
                        >
                          <option value="">Joyni o'zida</option>
                          <option value="">Olib ketish</option>
                          <option value="">Yetkazish</option>
                        </select>
                      </div>
                    </div>

                    {menu == 1 && (
                      <div className="pizzas">
                        <div className="pizza">
                          {pizza.map((pizza) => (
                            <div className="pizzase" key={pizza.id}>
                              <img src={pizza.image} alt="" />
                              <h1>{pizza.title}</h1>
                              <h2>{pizza.price} so'm</h2>
                              <h3>{pizza.isAvailable}</h3>
                              <button
                                className="addorder"
                                onClick={() => addToOrders(pizza)}
                              >
                                Savatga qo'shish
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {menu == 2 && (
                      <div className="pizzas">
                        <div className="pizza">
                          {lavash.map((lavash) => (
                            <div className="pizzase" key={lavash.id}>
                              <img src={lavash.image} alt="" />
                              <h1>{lavash.title}</h1>
                              <h2>{lavash.price} so'm</h2>
                              <h3>{lavash.isAvailable}</h3>

                              <button
                                className="addorder"
                                onClick={() => addToOrders(lavash)}
                              >
                                Savatga qo'shish
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {menu == 3 && (
                      <div className="pizzas">
                        <div className="pizza">
                          {salat.map((salat) => (
                            <div className="pizzase" key={salat.id}>
                              <img src={salat.image} alt="" />
                              <h1>{salat.title}</h1>
                              <h2>{salat.price} so'm</h2>
                              <h3>{salat.isAvailable}</h3>
                              <button
                                className="addorder"
                                onClick={() => addToOrders(salat)}
                              >
                                Savatga qo'shish
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {menu == 4 && (
                      <div className="pizzas">
                        <div className="pizza">
                          {ichimlik.map((ichimlik) => (
                            <div className="pizzase" key={ichimlik.id}>
                              <img src={ichimlik.image} alt="" />
                              <h1>{ichimlik.title}</h1>
                              <h2>{ichimlik.price} so'm</h2>
                              <h3>{ichimlik.isAvailable}</h3>
                              <button
                                className="addorder"
                                onClick={() => addToOrders(ichimlik)}
                              >
                                Savatga qo'shish
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {menu == 5 && (
                      <div className="pizzas">
                        <div className="pizza">
                          {burger.map((burger) => (
                            <div className="pizzase" key={burger.id}>
                              <img src={burger.image} alt="" />
                              <h1>{burger.title}</h1>
                              <h2>{burger.price} so'm</h2>
                              <h3>{burger.isAvailable}</h3>
                              <button
                                className="addorder"
                                onClick={() => addToOrders(burger)}
                              >
                                Savatga qo'shish
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {menu == 6 && (
                      <div className="pizzas">
                        <div className="pizza">
                          {shirinlik.map((shirinlik) => (
                            <div className="pizzase" key={shirinlik.id}>
                              <img src={shirinlik.image} alt="" />
                              <h1>{shirinlik.title}</h1>
                              <h2>{shirinlik.price} so'm</h2>
                              <h3>{shirinlik.isAvailable}</h3>
                              <button
                                className="addorder"
                                onClick={() => addToOrders(shirinlik)}
                              >
                                Savatga qo'shish
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="orders">
                  <div className="order_top flex justify-between">
                    <h1>Buyurtmalar #35324</h1>
                    <h2>Jami: {calculateTotalPrice()} so'm</h2>
                  </div>
                  <div className="order__btns">
                    <button className="">Joyni o'zida</button>
                    <button>Olib ketish</button>
                    <button>Yetkazish</button>
                  </div>
                  <div className="order__type flex justify-between mt-6 mb-4">
                    <h2 className=" text-1xl font-poppins font-medium">Item</h2>
                    <div className="qp flex gap-12">
                      <h2 className=" text-1xl font-poppins font-medium">
                        Qty
                      </h2>
                      <h2 className=" text-1xl font-poppins font-medium">
                        Price
                      </h2>
                    </div>
                  </div>

                  <hr />

                  <div className="food flex">
                    <div className="food__top mt-7">
                      {orders.map((orderItem) => (
                        <div className="mb-6" key={orderItem.id}>
                          <div className="food_top flex justify-between">
                            <div className="food_left flex gap-3 ">
                              <img
                                className="food__img"
                                src={orderItem.image}
                                alt=""
                              />
                              <div className="food__info mr-2">
                                <h1>{orderItem.title}</h1>
                                <h1>{orderItem.price} so'm</h1>
                              </div>
                            </div>
                            <div className="prices flex">
                              <div className="num">{orderItem.quantity}</div>
                              <div className="food__price">
                                {orderItem.price * orderItem.quantity} so'm
                              </div>
                            </div>
                          </div>
                          <div className="food__bottom flex items-center justify-between mt-1 mx-auto my-auto gap-8">
                            <input
                              className="inputt border-none outline-none bg-gray-800 p-3 rounded-md h-15"
                              type="text"
                              placeholder="Order note"
                            />
                            <img
                              src={del}
                              alt=""
                              onClick={() => removeFromOrders(orderItem.id)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {section == 2 && (
              <div className="header__two">
                <h1 className="text-white text-3xl">Settings</h1>
                <div className="settings flex gap-[30px]">
                  <div className="setting__left mt-[30px] pt-[5px] bg-[#1F1D2B] w-[275px] h-[490px] rounded-[10px]">
                    <div className="setting__item pl-[20px] pt-[15px] w-[275px] h-[80px]">
                      <div className="item__top flex gap-2 ">
                        <img width={20} height={20} src={heart} alt="" />
                        <h1 className="text-white">Appereance</h1>
                      </div>
                      <div className="item__bottom">
                        <p className="text-[#ABBBC2] text-[15px]">
                          Dark and Light mode, Font size
                        </p>
                      </div>
                    </div>

                    <div className="setting__item pl-[20px] pt-[15px] w-[275px] h-[80px]">
                      <div className="item__top flex gap-2 ">
                        <img width={20} height={20} src={heart} alt="" />
                        <h1 className="text-white">Your Restaurant</h1>
                      </div>
                      <div className="item__bottom">
                        <p className="text-[#ABBBC2] text-[15px]">
                          Dark and Light mode, Font size
                        </p>
                      </div>
                    </div>

                    <div className="setting__item pl-[20px] pt-[15px] w-[275px] h-[80px]">
                      <div className="item__top flex gap-2 ">
                        <img width={20} height={20} src={heart} alt="" />
                        <h1 className="text-white">Products Management</h1>
                      </div>
                      <div className="item__bottom">
                        <p className="text-[#ABBBC2] text-[15px]">
                          Manage your product, pricing, etc
                        </p>
                      </div>
                    </div>

                    <div className="setting__item pl-[20px] pt-[15px] w-[275px] h-[80px]">
                      <div className="item__top flex gap-2 ">
                        <img width={20} height={20} src={heart} alt="" />
                        <h1 className="text-white">Notifications</h1>
                      </div>
                      <div className="item__bottom">
                        <p className="text-[#ABBBC2] text-[15px]">
                          Customize your notifications
                        </p>
                      </div>
                    </div>

                    <div className="setting__item pl-[20px] pt-[15px] w-[275px] h-[80px]">
                      <div className="item__top flex gap-2 ">
                        <img width={20} height={20} src={heart} alt="" />
                        <h1 className="text-white">Security</h1>
                      </div>
                      <div className="item__bottom">
                        <p className="text-[#ABBBC2] text-[15px]">
                          Configure Password, PIN, etc
                        </p>
                      </div>
                    </div>

                    <div className="setting__item pl-[20px] pt-[15px] w-[275px] h-[80px]">
                      <div className="item__top flex gap-2 ">
                        <img width={20} height={20} src={heart} alt="" />
                        <h1 className="text-white">About us</h1>
                      </div>
                      <div className="item__bottom">
                        <p className="text-[#ABBBC2] text-[15px]">
                          Find out more about Posly
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="setting__right">
                    <div className="panel__top flex justify-between">
                      <h1>Products Management</h1>
                      <button className="flex items-center">
                        {" "}
                        <img src={filter} alt="" />
                        Manage Categories
                      </button>
                    </div>

                    <div className="panel__menu">
                      <ul>
                        <li>
                          <a href="#">Pitsalar</a>
                        </li>
                        <li>
                          <a href="#">Lavashlar</a>
                        </li>
                        <li>
                          <a href="#">Salatlar</a>
                        </li>
                        <li>
                          <a href="#">Ichimliklar</a>
                        </li>
                        <li>
                          <a href="#">Burgerlar</a>
                        </li>
                        <li>
                          <a href="#">Shirinliklar</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </header>
        </div>
      </div>
    </>
  );
}

export default App;
