import Contact from "./Contact.js";
import User from "./User.js";

Contact.belongsTo(User, {
  foreignKey: "owner",
  as: "user",
});
