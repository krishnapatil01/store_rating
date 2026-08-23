const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main() {
  const hashShruti = await bcrypt.hash('Shruti@1234', 10);
  await prisma.user.updateMany({
    where: { email: 'shruti@gmail.com' },
    data: { password: hashShruti }
  });
  
  const hashVijay = await bcrypt.hash('Vijay@123-456', 10);
  await prisma.user.updateMany({
    where: { email: 'vrp@gmail.com' },
    data: { password: hashVijay }
  });
  
  console.log('Passwords updated for shruti@gmail.com and vrp@gmail.com');
}
main();
