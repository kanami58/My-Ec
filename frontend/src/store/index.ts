import { atom, selector } from "recoil";

import { Item } from "../types";

atom;

export const allItemsSelector = selector<Item[]>({
  key: "allItemsSelector",
  get: async () => {
    // ここでAPIにリクエストを行ってDBの値を取得する
		const result = await fetch('http://localhost:3000/items', { mode: "cors"})
			console.log(result)
			const body = await result.json()
			console.log(body)

    return body;
  },
});
