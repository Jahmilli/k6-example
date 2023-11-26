# K6 Example

This repository contains a starting point for running k6 tests in typescript. It uses a publicly hosted endpoint so that anyone with internet access can test out the API themselves and then use this repo as a starting point to continue building their own tests.

## Pre-Reqs

- Download `k6` from here https://k6.io/docs/get-started/installation/
- Install dependencies `yarn install`
- Docker

### Installing xk6-dashboard with Docker

[xk6-dashboard](https://github.com/grafana/xk6-dashboard) is a k6 extension that can be used to visualise your performance test in real time.

To run the tests with monitoring with xk6-dashboard extension, we need to install it. The simplest way to install is via docker and can be done via

`docker pull ghcr.io/grafana/xk6-dashboard:0.6.1`

## Tests

### reqres

We use the [reqres](https://reqres.in/) publicly hosted REST API to showcase the testing with k6

To execute the first sample test that showcases how `per-vu-iterations` works, you can run:

`yarn test:demo`

To test with monitoring in place, run:

`yarn test-with-monitoring:demo`

To execute the second sample test that showcases how to use `stages`, you can run:

`yarn test:demo-stages`

To test with monitoring in place, run:

`yarn test-with-monitoring:demo-stages`

