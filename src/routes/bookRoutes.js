const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
} = require("../controllers/bookController");

// Anyone logged in can view books
router.get("/", auth, getBooks);

router.get("/:id", auth, getBookById);

// Librarian only
router.post("/", auth, role("LIBRARIAN"), addBook);

router.put("/:id", auth, role("LIBRARIAN"), updateBook);

router.delete("/:id", auth, role("LIBRARIAN"), deleteBook);

module.exports = router;
