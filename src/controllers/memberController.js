const prisma = require("../config/prisma");

exports.getMembers = async (req, res) => {
  try {

    const members = await prisma.user.findMany({
      where: {
        role: "MEMBER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    res.json({
      success: true,
      count: members.length,
      members,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

exports.deleteMember = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const member = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!member || member.role !== "MEMBER") {
      return res.status(404).json({
        success: false,
        message: "Member not found.",
      });
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Member deleted successfully.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }

};

exports.myBorrowedBooks = async (req, res) => {

  try {

    const books = await prisma.borrow.findMany({

      where: {
        userId: req.user.id,
        status: "BORROWED",
      },

      include: {
        book: true,
      },

    });

    res.json({
      success: true,
      count: books.length,
      books,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }

};
