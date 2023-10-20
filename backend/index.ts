import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { request } from "http";

const app: express.Express = express();
const port = 3000;

app.use(
  bodyParser.urlencoded({
    // limit: "50mb",
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  cors({
    // origin: 'http://localhost:5173', //アクセス許可するオリジン
    origin: "*", //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200, //レスポンスstatusを200に設定
  })
);

const prisma = new PrismaClient();

app.get("/items", async (_req, res) => {
  const allItems = await prisma.item.findMany();
  res.send(allItems);
});

app.post("/items", async (req, res) => {
  await prisma.item.create({
    data: {
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    },
  });
  res.send("created");
});

app.post("/items/delete", async (req, res) => {
  await prisma.item.deleteMany({
    where: {
      id: {
        in: req.body.ids,
      },
    },
  });
  res.send("deleted");
});

app.get("/cart", async (_req, res) => {
  const allItems = await prisma.cart.findMany();
  res.send(allItems);
});

app.post("/cart/add", async (req, res) => {
  await prisma.cart.create({
    data: {
      itemId: req.body.itemId,
      userId: req.body.userId,
      count: req.body.count,
    },
  });
  res.send("created");
});

app.post("/cart/count", async (req, res) => {
  await prisma.cart.update({
    where: {
      id:  req.body.cartId,
    },
    data: {
      count: req.body.count
    }
  });
  res.send("updated");
});

app.post("/cart/delete", async (req, res) => {
  await prisma.cart.delete({
    where: {
      id:  req.body.cartId,
    }
  });
  res.send("deleted");
});

app.post("/checkout", async (req, res) => {
  await prisma.$transaction(async (prisma)=> {
    await prisma.cart.deleteMany({
      where: {
        id: {
          in: req.body.cartIds,
        },
      },
    });
  
    const date = new Date()
    await prisma.checkout.createMany({
      data: req.body.checkouts.map((co: any) => ({ ...co, checkoutAt: date })),
    });
  }) 

  res.send("checkouted");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
