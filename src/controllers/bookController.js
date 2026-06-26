const prisma = require("../config/prisma");

exports.addBook = async (req, res) => {
    try {

        const {
            title,
            author,
            isbn,
            category,
            quantity
        } = req.body;

        if (
            !title ||
            !author ||
            !isbn ||
            !category ||
            quantity == null
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        if (quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity cannot be negative."
            });
        }

        const existingBook = await prisma.book.findUnique({
            where: {
                isbn
            }
        });

        if (existingBook) {
            return res.status(400).json({
                success: false,
                message: "ISBN already exists."
            });
        }

        const book = await prisma.book.create({
            data: {
                title,
                author,
                isbn,
                category,
                quantity,
                availableQuantity: quantity
            }
        });

        return res.status(201).json({
            success: true,
            message: "Book added successfully.",
            book
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

exports.getBooks = async (req, res) => {

    try {

        const books = await prisma.book.findMany();

        res.json({
            success: true,
            count: books.length,
            books
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

exports.getBookById = async (req, res) => {

    try {

        const id = parseInt(req.params.id);

        const book = await prisma.book.findUnique({
            where: {
                id
            }
        });

        if (!book) {

            return res.status(404).json({
                success: false,
                message: "Book not found."
            });

        }

        res.json({
            success: true,
            book
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

exports.updateBook = async (req, res) => {

    try {

        const id = parseInt(req.params.id);

        const {
            title,
            author,
            isbn,
            category,
            quantity,
            availableQuantity
        } = req.body;

        const book = await prisma.book.findUnique({
            where: {
                id
            }
        });

        if (!book) {

            return res.status(404).json({
                success: false,
                message: "Book not found."
            });

        }

        const updatedBook = await prisma.book.update({

            where: {
                id
            },

            data: {
                title,
                author,
                isbn,
                category,
                quantity,
                availableQuantity
            }

        });

        res.json({
            success: true,
            message: "Book updated successfully.",
            book: updatedBook
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

exports.deleteBook = async (req, res) => {

    try {

        const id = parseInt(req.params.id);

        const book = await prisma.book.findUnique({
            where: {
                id
            }
        });

        if (!book) {

            return res.status(404).json({
                success: false,
                message: "Book not found."
            });

        }

        await prisma.book.delete({
            where: {
                id
            }
        });

        res.json({
            success: true,
            message: "Book deleted successfully."
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};
