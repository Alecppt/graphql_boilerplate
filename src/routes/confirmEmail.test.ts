import fetch from 'node-fetch';

test('test invalid email Link for confirming account creation', async () => {
  let status = 0;
  await fetch(`${process.env.TEST_REST_HOST}/confirm/345up3u5`, {
    method: 'GET',
  }).then((res) => {
    status = res.status;
  });
  expect(status).toEqual(404);
});
