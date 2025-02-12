const mongoose = require("mongoose"); // Perbaikan dari moongose ke mongoose
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    points: {
      type: Number,
      default: 0,
    },
    redeemedVouchers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voucher',  // Referensikan model Voucher
    }],
  },
  { timestamps: true }
);

// Validasi password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password sebelum menyimpan user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Check if the model already exists to prevent overwriting
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
