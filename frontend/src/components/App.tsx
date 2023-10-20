import React from "react";
import { Route, Routes } from "react-router-dom";

import Admin from "../pages/Admin";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ItemDetail from "../pages/ItemDetail";
import ItemList from "../pages/ItemList";
import RegisterItem from "../pages/RegisterItem";
import Thanks from "../pages/Thanks";

function App() {
  return (
    <>
      <React.Suspense fallback={<div>データ読み込み中です</div>}>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/item/register" element={<RegisterItem />} />
          <Route path="/itemlist" element={<ItemList />} />
          <Route path="/item" element={<ItemDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
