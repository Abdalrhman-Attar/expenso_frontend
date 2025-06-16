import { useContext } from "react";
import { StoreContext } from "../../state/StoreContext";

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return [context.state, context.dispatch];
}
