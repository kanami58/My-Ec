import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";

import SignOutButton from "./SignOutButton";
import awsExports from "../aws-exports.json";
import Admin from "../pages/Admin";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ItemDetail from "../pages/ItemDetail";
import ItemList from "../pages/ItemList";
import RegisterItem from "../pages/RegisterItem";
import Thanks from "../pages/Thanks";

Amplify.configure({
  Auth: {
    region: awsExports.aws_project_region,
    userPoolId: awsExports.aws_user_pools_id,
    userPoolWebClientId: awsExports.aws_user_pools_web_client_id,
  },
});

function App() {
  return (
    <>
      <Authenticator
        formFields={{
          signUp: { nickname: { placeholder: "ニックネームを入力" } },
        }}
      >
        {({ signOut, user }) => (
          <React.Suspense fallback={<div>データ読み込み中です</div>}>
            <p>{user?.attributes?.nickname}さん</p>
            <SignOutButton signOut={signOut} />
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/item/register" element={<RegisterItem />} />
              <Route path="/" element={<ItemList />} />
              <Route path="/item" element={<ItemDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/thanks" element={<Thanks />} />
            </Routes>
          </React.Suspense>
        )}
      </Authenticator>
    </>
  );
}

export default App;
