const mongoose = require("mongoose");
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
      ref: 'Voucher',  // Reference to the Voucher model
    }],
    profilePicture: { type: String, default: 'https://res.cloudinary.com/dhwvjtkyw/image/upload/v1741318281/litbrew_profiles/wco4dztan09ukrsi5yue.png' },  // Store profile picture URL
  },
  { timestamps: true }
);

// Validate password match or not
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password before saving the user (if password is modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Avoid overwriting the model if it's already defined
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
