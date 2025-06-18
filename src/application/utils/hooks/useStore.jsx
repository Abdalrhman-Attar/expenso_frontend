import { useContext } from "react";
import { StoreContext } from "../../state/StoreContext";

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be inside StoreProvider");
  // return everything: state, dispatch, plus your new async methods
  return ctx;
}
