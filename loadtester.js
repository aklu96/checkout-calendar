/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 500 },
    { duration: '5m', target: 500 },
    { duration: '2m', target: 1000 },
    { duration: '5m', target: 1000 },
    { duration: '2m', target: 1500 },
    { duration: '5m', target: 1000 },
    { duration: '5m', target: 100 },
  ],
};

export default () => {
  const BASE_URL = 'http://localhost:3000';
  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/api/booking-info/500000`,
      null,
      { tages: { name: 'Checkout Calendar' } },
    ],
  ]);

  check(http.get(`${BASE_URL}/api/booking-info/500000`), {
    'status is 200': (r) => r.status === 200,
  }) || errorRate.add(1);

  sleep(1);
};
