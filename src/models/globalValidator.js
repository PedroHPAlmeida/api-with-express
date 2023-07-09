import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (value) => {
    return value.trim() !== "";
  },
  message: ({ path }) => `O campo ${path} foi fornecido em branco`
});
