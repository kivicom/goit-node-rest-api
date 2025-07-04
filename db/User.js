import { DataTypes } from "sequelize";

import sequelize from "./sequelize.js";

import { emmailRegexp } from "../costants/auth.js";

const User = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Email in use",
    },
    validate: {
      is: emmailRegexp,
    },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

//User.sync();

export default User;
