import "./App.css"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Main from "./components/Main"

const App = () => {
  return (
    <>
      <Header />

      <Main />

      <Footer />
    </>

    //   <script>
    //   // TODO: replace it with React!
    //   const searchEl = document.querySelector("[data-id=search-expander]")
    //   const searchFormEl = document.querySelector("[data-id=search-form]")
    //   searchEl.addEventListener("click", () => {
    //     searchFormEl.classList.toggle("invisible")
    //     searchFormEl.querySelector("input").focus()
    //   })
    // </script>
  )
}

export default App
