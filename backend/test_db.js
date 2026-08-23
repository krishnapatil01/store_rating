const { Client } = require('./node_modules/pg');

async function test() {
  const passwords = ['postgres', 'admin', 'root', '1234', '123456', 'password', 'Krishna', 'krishna', 'Roxiler', 'roxiler', 'acer', ''];
  for (const p of passwords) {
    try {
      const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: p,
        port: 5432,
      });
      await client.connect();
      console.log('SUCCESS_FOUND_PASSWORD:', p);
      await client.end();
      return;
    } catch (e) {
      console.log('Tested password [' + p + '] -> ' + e.message);
    }
  }
}

test();
