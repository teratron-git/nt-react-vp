import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setOrder } from "../../../../store/mainSlice"

const Order = () => {
  const dispatch = useDispatch()

  const [phone, setPhone] = useState("")
  console.log("🚀 ~ file: Order.tsx ~ line 5 ~ Order ~ phone", phone)
  const [address, setAddress] = useState("")
  console.log("🚀 ~ file: Order.tsx ~ line 7 ~ Order ~ address", address)
  const [isChecked, setIsChecked] = useState(false)
  console.log("🚀 ~ file: Order.tsx ~ line 9 ~ Order ~ isChecked", isChecked)

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
    console.log("🚀 ~ file: Order.tsx ~ line 29 ~ Order ~ order", order)

    const body = order.map((item: any) => {
      const x = {
        id: item.id,
        price: item.price,
        count: item.amount,
      }

      return x
    })

    dispatch(setOrder({ owner: { phone, address }, item: body }))
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
        <form className="card-body" onSubmit={onFormSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input className="form-control" id="phone" placeholder="Ваш телефон" value={phone} onChange={phoneChangeHandler} />
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
  )
}

export default Order
