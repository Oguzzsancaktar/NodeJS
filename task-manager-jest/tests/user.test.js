const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

// afterEach(() => {
//   console.log("after each");
// })

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'oguztest',
      email: 'oguz@test.com',
      password: 'oguztest1',
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
});

test('Should login existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: 'oguz@oguz.com',
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOne._id);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login existing user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'oguz@oguznot.com',
      password: userOne.password,
    })
    .expect(400);
});

test('should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('should not get profile for authenticated user', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('should delete account for user', async () => {
  const response = await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOne._id);
  expect(user).toBeNull();
});

test('should not delete account for user', async () => {
  await request(app).delete('/users/me').send().expect(401);
});

test('should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/oguzsancaktar-profile.jpg')
    .expect(200);

  const user = await User.findById(userOne._id);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test('should update valid user fields', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'updated name',
    })
    .expect(200);

  const user = await User.findById(userOne._id);

  expect(user.name).toEqual('updated name');
});

test('should not update not valid user field', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ location: 'Istanbul' })
    .expect(400);
});
