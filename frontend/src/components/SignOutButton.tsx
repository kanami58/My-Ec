import { useRecoilCallback } from "recoil";

import { cartItemsSelector } from "../store";

type Props = {
  signOut: VoidFunction | undefined;
};

function SignOutButton(props: Props) {
  const refreshItems = useRecoilCallback(({ refresh }) => () => {
    refresh(cartItemsSelector);
  });
  return (
    <button
      onClick={() => {
        refreshItems();
        props.signOut && props.signOut();
      }}
    >
      Sign out
    </button>
  );
}

export default SignOutButton;
