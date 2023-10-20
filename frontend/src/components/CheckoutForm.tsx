import { Box, Snackbar } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilCallback, useRecoilValue } from "recoil";

import PrefSelectBox from "./PrefSelectBox";
import { cartItemsSelector } from "../store";

type Inputs = {
  email: string;
  last_name: string;
  first_name: string;
  post_code: string;
  pref: string;
  city: string;
  address: string;
  pay_method: "クレジットカード" | "銀行振込" | "着払い";
};

function CheckoutForm() {
  //   const {
  //     register,
  //     handleSubmit,
  //     // watch,
  //     // formState: { errors },
  //   } = useForm<Inputs>();
  const useFormMethods = useForm<Inputs>();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useFormMethods;

  const radioButtons = [
    {
      id: "credit",
      label: "クレジットカード",
      value: "クレジットカード",
      required: true,
    },
    { id: "bank", label: "銀行振込", value: "銀行振込", required: false },
    {
      id: "cash_on_delivery",
      label: "着払い",
      value: "着払い",
      required: false,
    },
  ];

  const cartItems = useRecoilValue(cartItemsSelector);
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const refreshItems = useRecoilCallback(({ refresh }) => () => {
    refresh(cartItemsSelector);
  });

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      await fetch("http://localhost:3000/checkout", {
        mode: "cors",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartIds: cartItems.map((cartItem) => cartItem.cartId),
          checkouts: cartItems.map((cartItem) => {
            return {
              itemId: cartItem.itemId,
              userId: 1,
              count: cartItem.count,
              totalPrice: cartItem.price * cartItem.count,
            };
          }),
        }),
      });
      refreshItems();
      navigate("/thanks");
    } catch {
      setOpen(true);
    }
  };

  return (
    <>
      <FormProvider {...useFormMethods}>
        <form onSubmit={handleSubmit((inputs) => console.log(inputs))}>
          <Box>
            <label>
              連絡先
              <input
                type="email"
                {...(register("email"), { required: true })}
              />
            </label>
          </Box>

          <Box>
            <label htmlFor="">
              姓
              <input
                type="text"
                {...(register("last_name"), { required: true })}
              />
            </label>
          </Box>

          <Box>
            <label htmlFor="">
              名
              <input
                type="text"
                {...(register("first_name"), { required: true })}
              />
            </label>
          </Box>

          <Box>
            <label htmlFor="">
              郵便番号
              <input
                type="text"
                {...(register("post_code"), { required: true })}
              />
            </label>
          </Box>

          <Box>
            <PrefSelectBox
              name={"pref"}
              {...(register("pref"), { required: true })}
            />
          </Box>

          <Box>
            <label htmlFor="">
              市町村
              <input type="text" {...(register("city"), { required: true })} />
            </label>
          </Box>

          <Box>
            <label htmlFor="">
              住所
              <input type="text" {...register("address", { required: true })} />
            </label>
          </Box>

          <Box>
            決済方法
            {radioButtons.map((radio) => {
              const { id, label, value, required } = radio;
              return (
                <label key={id}>
                  <input
                    type="radio"
                    value={value}
                    {...register("pay_method", { required })}
                  />
                  {label}
                </label>
              );
            })}
          </Box>

          {/* <input defaultValue="test" {...register("example")} />
        <input {...register("exampleRequired", { required: true })} /> */}

          {errors && <span>This field is required</span>}

          <input type="submit" value={"購入する"} onClick={onSubmit} />
        </form>
      </FormProvider>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message="エラーが発生しました。商品は購入できませんでした。"
      />
    </>
  );
}

export default CheckoutForm;
