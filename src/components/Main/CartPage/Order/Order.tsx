import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { changeCountOrders, setOrder, setOrderStatus } from "../../../../store/mainSlice"
import * as mainSelector from "../../../../store/selectors"
import Preloader from "../../Preloader"

const Order = () => {
  const dispatch = useDispatch()
  const getOrderStatus = useSelector(mainSelector.getOrderStatus)

  console.log("🚀 ~ file: Order.tsx ~ line 10 ~ Order ~ getOrderStatus", getOrderStatus)

  const [phone, setPhone] = useState("")
  console.log("🚀 ~ file: Order.tsx ~ line 5 ~ Order ~ phone", phone)
  const [address, setAddress] = useState("")
  console.log("🚀 ~ file: Order.tsx ~ line 7 ~ Order ~ address", address)
  const [isChecked, setIsChecked] = useState(false)
  console.log("🚀 ~ file: Order.tsx ~ line 9 ~ Order ~ isChecked", isChecked)
  const [status, setStatus] = useState(getOrderStatus)
  console.log("🚀 ~ file: Order.tsx ~ line 19 ~ Order ~ status", status)

  useEffect(() => {
    setStatus(getOrderStatus)

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

  const chekedToogleHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsChecked(!isChecked)
  }

  const onFormSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    const order = JSON.parse(localStorage.getItem("order")) || []

    const body = order.map((item: any) => ({
      id: item.id,
      price: item.price,
      count: item.amount,
    }))

    dispatch(setOrder({ owner: { phone, address }, items: body }))
  }

  return (
    <>
      {status === "loading" ? (
        <Preloader />
      ) : (
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
      )}
    </>
  )
}

export default Order
