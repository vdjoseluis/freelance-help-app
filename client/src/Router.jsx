import { BrowserRouter, Route, Routes } from "react-router-dom"
import Invoice from "./components/Invoice"
import HelpFillingForm from "./components/HelpFillingForm"
import Home from "./components/Home"
const Router = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/helpFilling" element={<HelpFillingForm />} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default Router
