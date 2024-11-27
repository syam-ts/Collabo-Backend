import validator from "validator";

export const validateSignUpData = (req: any) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName && !lastName) {
    throw new Error("Name is mandatory");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email in not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};

export const validateProfileData = (req: any) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field: any) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};
