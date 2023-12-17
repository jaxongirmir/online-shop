import "./SearchPanel.css";
import nothingFIndImg from '../../assets/search__nothing.png'

export default function SearchPanel({ data, search }) {
  const filteredProducts = data.filter((el) => {
    return el.title.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div className="serach__panel">
      <div className="filtered__products">
        {!filteredProducts.length ? (
          <div className="nothingSearch">
            <img src={nothingFIndImg} />
            <h3>Hechnarsa toplimadi</h3>
          </div>
        ) : (
          filteredProducts.slice(0, 3)?.map((filPro) => (
            <div key={filPro.id} className="filtered__item">
              <img src={filPro.url} />
              <div className="texts__filteredProducts">
                <p>{filPro.title}</p>
                <div className="price__filteredProducts">
                  <b>{filPro.price} so'm</b>
                  <del>{filPro.price * 1.2} so'm</del>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
