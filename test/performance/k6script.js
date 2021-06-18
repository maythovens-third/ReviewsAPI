import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  stages: [
    { duration: '30s', target: 200 },
    { duration: '10s', target: 700 },
    { duration: '10s', target: 1500 },
    { duration: '1m30s', target: 3000 },
    { duration: '10s', target: 1500 },
    { duration: '20s', target: 200 },
  ],
};
export default function () {
  http.get('http://localhost:3000/reviews/meta?product_id=23180');
  sleep(1);
}