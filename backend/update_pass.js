const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main() {
  const hash = await bcrypt.hash('Admin@1234', 10);
  await prisma.user.update({
    where: { email: 'shruti@gmail.com' },
    data: { password: hash }
  });
  console.log('Password updated to Admin@1234');
}
main();
