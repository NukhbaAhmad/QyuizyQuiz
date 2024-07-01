import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Store } from "./index";

export type AppDispatch = typeof Store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof Store.getState>
> = useSelector;

import { resetData } from "./slices/GetQuestions";

export { resetData };
