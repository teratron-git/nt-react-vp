import React from "react"

const TopSales = () => {
  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row">
        <div className="col-4">
          <div className="card">
            <img src="./img/products/sandals_myer.jpg" className="card-img-top img-fluid" alt="Босоножки 'MYER'" />
            <div className="card-body">
              <p className="card-text">Босоножки 'MYER'</p>
              <p className="card-text">34 000 руб.</p>
              <a href="/products/1.html" className="btn btn-outline-primary">
                Заказать
              </a>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <img src="./img/products/sandals_keira.jpg" className="card-img-top img-fluid" alt="Босоножки 'Keira'" />
            <div className="card-body">
              <p className="card-text">Босоножки 'Keira'</p>
              <p className="card-text">7 600 руб.</p>
              <a href="/products/1.html" className="btn btn-outline-primary">
                Заказать
              </a>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <img src="./img/products/superhero_sneakers.jpg" className="card-img-top img-fluid" alt="Супергеройские кеды" />
            <div className="card-body">
              <p className="card-text">Супергеройские кеды</p>
              <p className="card-text">1 400 руб.</p>
              <a href="/products/1.html" className="btn btn-outline-primary">
                Заказать
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopSales
