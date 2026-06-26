const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getMembers,
  deleteMember,
  myBorrowedBooks,
} = require("../controllers/memberController");

// Librarian APIs
router.get("/", auth, role("LIBRARIAN"), getMembers);

router.delete("/:id", auth, role("LIBRARIAN"), deleteMember);

// Member API
router.get("/me/books", auth, role("MEMBER"), myBorrowedBooks);

module.exports = router;
