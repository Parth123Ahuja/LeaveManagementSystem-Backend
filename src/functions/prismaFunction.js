const { PrismaClient } = require("@prisma/client");
const { func } = require("joi");
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
  let {
    username,
    stage,
    type,
    from,
    to,
    name,
    status,
    reqMessage,
    rejMessage,
  } = data;
  let record = await prisma.record.create({
    data: {
      username,
      stage,
      type,
      from,
      name,
      to,
      status,
      reqMessage,
      rejMessage,
    },
  });

  return record;
}

async function userLeaves(username) {
  try {
    let leaves = await prisma.record.findMany({
      where: {
        username: username,
      },
    });
    return leaves;
  } catch (error) {
    throw new Error(error);
  }
}

async function getApplications(data) {
  try {
    let applications = await prisma.record.findMany({
      where: {
        stage: data,
      },
    });
    return applications;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  findUser,
  createUser,
  createRecord,
  userLeaves,
  getApplications,
};
