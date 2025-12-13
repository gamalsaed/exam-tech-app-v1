import { signUpSchema } from "@/lib/schemes/zod.schema";
import z from "zod";

const UserSchema = signUpSchema.omit({ password: true, rePassword: true });

type userInfoInputs = z.infer<typeof UserSchema>;

type DirtyFields = {
  email?: boolean;
  firstName?: boolean;
  lastName?: boolean;
  username?: boolean;
  phone?: boolean;
};

type UserKeys = keyof DirtyFields;

export function getDirtyFieldsValues(
  fields: userInfoInputs,
  dirtyFields: DirtyFields
) {
  const DIRTY_VALUES: Partial<userInfoInputs> = {};
  (Object.keys(dirtyFields) as UserKeys[]).forEach((key) => {
    DIRTY_VALUES[key] = fields[key];
  });

  return DIRTY_VALUES;
}
