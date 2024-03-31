const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findUser({ username, password }) {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
      password: password,
    },
  });
  if (user === null) return null;
  else return user;
}

async function createUser({ username, password, firstName, lastName, role }) {
  const newUser = await prisma.user.create({
    data: {
      username,
      password,
      firstName,
      lastName,
      role,
    },
  });

  return newUser;
}

async function createRecord({
  username,
  stage,
  type,
  from,
  to,
  status,
  reqMessage,
  rejMessage,
}) {
  const record = await prisma.record.create({
    data: {
      username,
      stage,
      type,
      from,
      to,
      status,
      reqMessage,
      rejMessage,
    },
  });

  return record;
}

async function userLeaves(username) {
  const leaves = prisma.record.findMany({
    where: {
      username: username,
    },
  });

  return leaves;
}

module.exports = { findUser, createUser, createRecord, userLeaves };
