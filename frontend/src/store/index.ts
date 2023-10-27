import { Auth } from "aws-amplify";
import { selector } from "recoil";

import { CartItem, Item } from "../types";

export const allItemsSelector = selector<Item[]>({
  key: "allItemsSelector",
  get: async () => {
    // ここでAPIにリクエストを行ってDBの値を取得する
    const result = await fetch("http://localhost:3000/items", { mode: "cors" });
    const body = await result.json();
    return body;
  },
});

export const cartItemsSelector = selector<CartItem[]>({
  key: "cartItemsSelector",
  get: async ({ get }) => {
    const user = await Auth.currentAuthenticatedUser();
    // ここでAPIにリクエストを行ってDBの値を取得する
    const result = await fetch(
      `http://localhost:3000/cart?userid=${user.username}`,
      { mode: "cors" }
    );
    const body: {
      id: number;
      userId: number;
      itemId: number;
      count: number;
    }[] = await result.json();
    const allItems = get(allItemsSelector);
    return body.map((cartRecord) => {
      const item = allItems.find((item) => item.id === cartRecord.itemId);
      return {
        count: cartRecord.count,
        cartId: cartRecord?.id,
        itemId: item?.id,
        name: item?.name,
        price: item?.price,
        imageUrl: item?.imageUrl,
      } as CartItem;
    });
  },
});
