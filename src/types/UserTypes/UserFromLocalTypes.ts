import { SignInResProps } from "../AuthTypes/SignInTypes";
import { UserType } from "./UserTypes";

type UserFromLocalType = {
  user: UserType | null;
  token: SignInResProps;
};

export type { UserFromLocalType };
