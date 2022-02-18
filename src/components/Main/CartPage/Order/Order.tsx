import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { changeCountOrders, IProductInfoForCart, setOrder, setOrderStatus } from "../../../../store/mainSlice"
import * as mainSelector from "../../../../store/selectors"
import Preloader from "../../Preloader"

const Order = () => {
  const dispatch = useDispatch()
  const getOrderStatus = useSelector(mainSelector.getOrderStatus)

  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [isChecked, setIsChecked] = useState(false)

  const [hasLocalStorageData, setHasLocalStorageData] = useState(null)

  useEffect(() => {
    setHasLocalStorageData(!!JSON.parse(localStorage.getItem("order"))?.length)
  }, [JSON.parse(localStorage.getItem("order"))?.length])

  useEffect(() => {
    getOrderStatus === "success" || getOrderStatus === "error"
      ? Swal.fire({
          title: getOrderStatus === "success" ? "Заказ оформлен" : "Заказ не оформлен",
          text: getOrderStatus === "success" ? "Спасибо за покупку" : "Обратитесь в тех. поддержку",
          icon: getOrderStatus,
          position: "top",
          timer: 3000,
          timerProgressBar: true,
        })
      : null

    if (getOrderStatus === "success") {
      setPhone("")
      setAddress("")
      setIsChecked(false)
      dispatch(changeCountOrders("0"))
      dispatch(setOrderStatus("idle"))
    }

    if (getOrderStatus === "error") {
      dispatch(setOrderStatus("idle"))
    }
  }, [getOrderStatus])

  const phoneChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhone(e.target.value)
  }

  const adsressChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setAddress(e.target.value)
  }

  const chekedToogleHandler: React.ChangeEventHandler<HTMLInputElement> = () => {
    setIsChecked(!isChecked)
  }

  const onFormSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    const order = JSON.parse(localStorage.getItem("order")) || []

    const body = order.map((item: IProductInfoForCart) => ({
      id: item.id,
      price: item.price,
      count: item.amount,
    }))

    dispatch(setOrder({ owner: { phone, address }, items: body }))
  }

  return (
    <>
      {getOrderStatus === "loading" ? (
        <Preloader />
      ) : hasLocalStorageData ? (
        <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
            <form className="card-body" onSubmit={onFormSubmit}>
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  className="form-control"
                  id="phone"
                  placeholder="Ваш телефон"
                  value={phone}
                  onChange={phoneChangeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  className="form-control"
                  id="address"
                  placeholder="Адрес доставки"
                  value={address}
                  onChange={adsressChangeHandler}
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreement"
                  checked={isChecked}
                  onChange={chekedToogleHandler}
                />
                <label className="form-check-label" htmlFor="agreement">
                  Согласен с правилами доставки
                </label>
              </div>
              <button type="submit" className="btn btn-outline-secondary" disabled={!(phone && address && isChecked)}>
                Оформить
              </button>
            </form>
          </div>
        </section>
      ) : null}
    </>
  )
}

export default Order
