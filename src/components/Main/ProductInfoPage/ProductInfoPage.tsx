import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getProductInfoById } from "../../../store/mainSlice"
import * as mainSelector from "../../../store/selectors"

const ProductInfoPage = () => {
  const dispatch = useDispatch()
  const productId = useParams()
  const productInfo = useSelector(mainSelector.productInfo)

  const [amount, setAmount] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")

  useEffect(() => {
    dispatch(getProductInfoById(+productId.id))
  }, [])

  const incrementHandler = () => {
    setAmount((prevAmount) => (prevAmount < 10 ? prevAmount + 1 : prevAmount))
  }

  const decrementHandler = () => {
    setAmount((prevAmount) => (prevAmount > 1 ? prevAmount - 1 : prevAmount))
  }

  const addToCartClickHandler = () => {
    // setAmount((prevAmount) => prevAmount - 1)
  }

  const sizeSelectionHandler = (size: string) => {
    setSelectedSize(size)
  }

  const isAvaliableSizes = productInfo?.sizes.find((item) => item.avalible === true)

  return (
    <section className="catalog-item">
      <h2 className="text-center">{productInfo?.title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={productInfo?.images[0]} className="img-fluid" alt="" />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{productInfo?.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{productInfo?.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{productInfo?.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{productInfo?.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{productInfo?.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{productInfo?.reason}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p>
              Размеры в наличии:
              {isAvaliableSizes
                ? productInfo.sizes.map((item) =>
                    item.avalible ? (
                      <span
                        key={item.size}
                        className={selectedSize !== item.size ? `catalog-item-size ` : `catalog-item-size selected`}
                        onClick={() => sizeSelectionHandler(item.size)}
                      >
                        {item.size}
                      </span>
                    ) : null
                  )
                : " нет"}
            </p>

            {isAvaliableSizes ? (
              <p>
                Количество:
                <span className="btn-group btn-group-sm pl-2">
                  <button type="button" className="btn btn-secondary" onClick={decrementHandler} disabled={amount === 1}>
                    -
                  </button>
                  <span className="btn btn-outline-primary">{amount}</span>
                  <button type="button" className="btn btn-secondary" onClick={incrementHandler} disabled={amount === 10}>
                    +
                  </button>
                </span>
              </p>
            ) : null}
          </div>
          {isAvaliableSizes ? (
            <button
              type="button"
              className="btn btn-danger btn-block btn-lg"
              onClick={addToCartClickHandler}
              disabled={!selectedSize}
            >
              В корзину
            </button>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default ProductInfoPage
