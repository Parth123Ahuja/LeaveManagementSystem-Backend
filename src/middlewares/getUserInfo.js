const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getUserInfo(req, res, next) {
  const { username } = req.decoded;
  try {
    const userInfo = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    req.userInfo = userInfo;
    next();
  } catch (error) {
    res.status(500).send("Internal server Error @ getUserInfo", error);
  }
}

module.exports = getUserInfo;
