import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeCountOrders, IProductInfoForCart } from "../../../store/mainSlice"
import * as mainSelector from "../../../store/selectors"
import Order from "./Order"

const CartPage = () => {
  const getCountOrders = useSelector(mainSelector.getCountOrders)
  console.log("🚀 ~ file: CartPage.tsx ~ line 9 ~ CartPage ~ getCountOrders!!!!!!!!!!!!!!!!!!!!!!!!!!", getCountOrders)
  const [order, setOrder] = useState<Array<IProductInfoForCart>>(JSON.parse(localStorage.getItem("order")) || [])
  const dispatch = useDispatch()

  const deleteHandler = (id: number) => {
    const currentLocalStorage = JSON.parse(localStorage.getItem("order"))
    const newArr = currentLocalStorage.filter((item: IProductInfoForCart) => item.id !== id)

    localStorage.removeItem("order")
    localStorage.setItem("order", JSON.stringify(newArr))
    setOrder(newArr)
    dispatch(changeCountOrders(JSON.parse(localStorage.getItem("order")).length))
  }

  useEffect(() => {
    getCountOrders === "0" && setOrder([])
  }, [getCountOrders])

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
            {order.map((item, i) => {
              return (
                <tr key={`${item.title} - ${item.size}`}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <a href={`/products/${item.id}.html`}>{item.title}</a>
                  </td>
                  <td>{item.size}</td>
                  <td>{item.amount}</td>
                  <td>{item.price}</td>
                  <td>{item.price * item.amount}</td>
                  <td>
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => deleteHandler(item.id)}>
                      Удалить
                    </button>
                  </td>
                </tr>
              )
            })}

            <tr>
              <td colSpan={5} className="text-right">
                Общая стоимость
              </td>
              <td>{order.reduce((result, curr) => result + curr.price * curr.amount, 0)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <Order />
    </>
  )
}

export default CartPage
