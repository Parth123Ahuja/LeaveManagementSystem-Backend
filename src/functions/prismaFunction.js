const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findUser({ username, password }) {
  let user = await prisma.user.findFirst({
    where: {
      username: username,
      password: password,
    },
  });
  if (user === null) return null;
  else return user;
}

async function createUser({ username, password, firstName, lastName, role }) {
  let newUser = await prisma.user.create({
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

async function createRecord(data) {
  let { username, stage, type, from, to, status, reqMessage } = data;
  let record = await prisma.record.create({
    data: {
      username,
      stage,
      type,
      from,
      to,
      status,
      reqMessage,
    },
  });

  return record;
}

async function userLeaves(username) {
  let leaves = await prisma.record.findMany({
    where: {
      username: username,
    },
  });
  return leaves;
}

module.exports = { findUser, createUser, createRecord, userLeaves };
