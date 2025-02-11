const bcrypt = require("bcryptjs");
const users = [
  {
    "name": "Admin",
    "email": "admin@node.com",
    "password": "123456",
    "isAdmin": true,
    "points": 500,  // Admin memiliki 500 poin
    "redeemedVouchers": [  // Daftar voucher yang telah ditebus
      "5f5b1b68f2d9f9b1a43b45b1",  // Voucher ID yang sudah ditebus
      "5f5b1b68f2d9f9b1a43b45b2"   // Voucher ID lainnya yang telah ditebus
    ]
  },
  {
    "name": "User1",
    "email": "user@node.com",
    "password": "123456",
    "points": 200,  // User1 memiliki 200 poin
    "redeemedVouchers": [  // Daftar voucher yang telah ditebus
      "5f5b1b68f2d9f9b1a43b45b3"  // Voucher ID yang sudah ditebus
    ]
  }
]


module.exports = users;
