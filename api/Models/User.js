const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Badge = require("./Badge")

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    points: { type: Number, default: 0 },
    redeemedVouchers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voucher',
    }],
    orderCount: { type: Number, default: 0 },
    profilePicture: { type: String, default: 'https://res.cloudinary.com/dhwvjtkyw/image/upload/v1741318281/litbrew_profiles/wco4dztan09ukrsi5yue.png' },
    badges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Badge',
      }
    ],
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

// Method to automatically update the badges based on orderCount
userSchema.methods.updateBadges = async function (Badge) {
  try {
    const unearnedBadges = await Badge.find({
      orderCount: { $lte: this.orderCount },
      _id: { $nin: this.badges },
    });

    if (unearnedBadges.length > 0) {
      this.badges.push(...unearnedBadges.map(badge => badge._id));
      await this.save();
    }
  } catch (error) {
    console.error('Error updating badges:', error);
    throw error;
  }
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
