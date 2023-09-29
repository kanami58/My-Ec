import React from "react";
import { Route, Routes } from "react-router-dom";

import Admin from "../pages/Admin";
import ItemList from "../pages/ItemList";
import RegisterItem from "../pages/RegisterItem";

function App() {
  return (
    <>
      <React.Suspense fallback={<div>データ読み込み中です</div>}>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/itemlist" element={<ItemList />} />
          <Route path="/admin/item/register" element={<RegisterItem />} />
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
