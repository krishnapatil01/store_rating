const bcrypt = require('bcryptjs');
async function main() {
  const hash = '.zghzy6.wxTiu/wrJgVLyozyVhNoYr7Qp4CA8HfCZdf.';
  console.log('Admin@1234:', await bcrypt.compare('Admin@1234', hash));
  console.log('Shruti@1234:', await bcrypt.compare('Shruti@1234', hash));
}
main();
