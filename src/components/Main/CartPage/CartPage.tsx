import Order from "./Order"

const CartPage = () => {
  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                <a href="/products/1.html">Босоножки 'MYER'</a>
              </td>
              <td>18 US</td>
              <td>1</td>
              <td>34 000 руб.</td>
              <td>34 000 руб.</td>
              <td>
                <button type="button" className="btn btn-outline-danger btn-sm">
                  Удалить
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan={5} className="text-right">
                Общая стоимость
              </td>
              <td>34 000 руб.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <Order />
    </>
  )
}

export default CartPage
