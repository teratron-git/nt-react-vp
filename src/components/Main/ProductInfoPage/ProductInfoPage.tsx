const ProductInfoPage = () => {
  return (
    <section className="catalog-item">
      <h2 className="text-center">Босоножки 'MYER'</h2>
      <div className="row">
        <div className="col-5">
          <img src=".././img/products/sandals_myer.jpg" className="img-fluid" alt="" />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>1000046</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>PAUL ANDREW</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>Чёрный</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>Кожа</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>Лето</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>Прогулка</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p>
              Размеры в наличии: <span className="catalog-item-size selected">18 US</span>
              <span className="catalog-item-size">20 US</span>
            </p>
            <p>
              Количество:
              <span className="btn-group btn-group-sm pl-2">
                <button type="button" className="btn btn-secondary">
                  -
                </button>
                <span className="btn btn-outline-primary">1</span>
                <button type="button" className="btn btn-secondary">
                  +
                </button>
              </span>
            </p>
          </div>
          <button type="button" className="btn btn-danger btn-block btn-lg">
            В корзину
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductInfoPage
