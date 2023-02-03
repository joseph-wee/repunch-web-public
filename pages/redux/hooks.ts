import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// useDispatch는 thunkAction에 대해 타입에러를 발생시킴, 커스텀해서 사용
export const useAppDispatch: () => AppDispatch = useDispatch;
// useSelector를 사용할 경우, 매번 state의 타입을 지정해줘야 함, 커스텀해서 사용
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
