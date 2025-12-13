import {
  deleteAccountAction,
  changePasswordAction,
  getUserAction,
} from "../actions/auth-action";
import { ChangePasswordInfo } from "../types/data";

// wrappers to the server actions

export async function deleteAccount() {
  return deleteAccountAction();
}

export async function changePasswordService(data: ChangePasswordInfo) {
  return changePasswordAction(data);
}

export async function getUserService() {
  return getUserAction();
}
