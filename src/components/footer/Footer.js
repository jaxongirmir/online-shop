import "./Footer.css";
import { Link, useLocation } from "react-router-dom";
import img1 from "../../assets/appStore.png";
import img2 from "../../assets/googlePlay.png";
import telegram from "../../assets/telegram.png";
import youtube from "../../assets/youtube.png";
import instagram from "../../assets/instagram.png";
import facebook from "../../assets/facebook.png";

const Footer = () => {
  let { pathname } = useLocation();
  if (pathname.includes("login") || pathname.includes('admin')) {
    return <></>;
  }

  return (
    <div className="container">
      <div className="Footer">
        <div className="Footer__in">
          <p>О нас</p>
          <Link>Пункты выдачи</Link>
          <Link>Вакансии</Link>
        </div>
        <div className="Footer__in">
          <p>Пользователям</p>
          <Link>Связаться с нами</Link>
          <Link>Вопрос - Ответ</Link>
        </div>
        <div className="Footer__in">
          <p>Для предпринимателей</p>
          <Link>Продавайте на Uzum</Link>
          <Link>Вход для продавцов</Link>
        </div>
        <div className="Footer__Links">
          <div className="top__Footer__links">
            <p>Скачать приложение</p>
            <div className="download_links">
              <img src={img1} />
              <img src={img2} />
            </div>
          </div>
          <div className="bottom__Footer__links">
            <p>Uzum в соцсетях</p>
            <div className="social_links">
              <Link to={"https://t.me/online_shop_site"} target="_blank">
                <img src={telegram} />
              </Link>
              <Link to={"https://www.youtube.com/channel/UCUKKUQOfq7m0ULw3e0wyAAw"} target="_blank">
                <img src={youtube} />
              </Link>
              <Link to={"https://www.instagram.com/joxa_muxa/"} target="_blank">
                <img src={instagram} />
              </Link>
              <Link to={"https://www.facebook.com"} target="_blank">
                <img src={facebook} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <footer>
        <div className="left__footer">
          <p>Соглашение о конфиденциальности</p>
          <p>Пользовательское соглашение</p>
        </div>
        <div className="right__footer">
          <span>
            «2023© ООО «UZUM MARKET». ИНН 309376127. Все права защищены»
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
