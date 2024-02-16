import * as assert from 'node:assert/strict';
import * as http from 'node:http';
import { describe, it } from 'mocha';

import * as Sack from '../src/index.mjs';

describe('Receiver', function () {
	const requestData = { method: null };
	const SetURL = ctx => ctx.url.href = 'http://[::1]:9000';
	const fetcher = new Sack.Fetcher(SetURL);

	const server = http.createServer((req, res) => {
		requestData.method = req.method;
		res.end('ok');
	});

	this.beforeAll(() => server.listen(9000, '::'));
	this.afterAll(() => server.close());
	this.beforeEach(() => requestData.method = null);

	describe('.fetcher', function () {
		it('should get the fetcher.', async function () {
			const receiver = await fetcher.request();

			assert.equal(receiver.fetcher, fetcher);
		});
	});

	describe('.response', function () {
		it('should not be same.', async function () {
			const receiver = await fetcher.request();

			assert.notDeepEqual(receiver.response, receiver.response);
		});

		it('should get origin response if receiver is finished.', async function () {
			const receiver = await fetcher.request();

			await receiver.end();
			assert.equal(receiver.response, receiver.response);
		});
	});

	describe('.finished', function () {
		it('should be false.', async function () {
			const receiver = await fetcher.request();

			assert.equal(receiver.finished, false);
		});

		it('should be true.', async function () {
			const receiver = await fetcher.request();

			await receiver.end();
			assert.equal(receiver.finished, true);
		});
	});

	describe('.use()', function () {
		it('should add new handlers.', async function () {
			const receiver = await fetcher.request();
			let flag = false;

			assert.equal(receiver.use(() => flag = true), receiver);
			await receiver.end();
			assert.equal(flag, true);
		});

		it('should throw if bad handler.', async function () {
			const receiver = await fetcher.request();

			assert.throws(() => receiver.use(null), {
				name: 'TypeError',
				message: 'Invalid "handlers[0]", one "function" expected.',
			});
		});

		it('should throw if receiver finished.', async function () {
			const receiver = await fetcher.request();

			assert.equal(receiver.use(), receiver);
			await receiver.end();

			assert.throws(() => receiver.use(), {
				name: 'SackError',
				message: 'Receiver has been finished.',
			});
		});
	});

	describe('.end()', function () {
		it('should throw if bad parser.', async function () {
			const receiver = await fetcher.request();

			assert.rejects(() => receiver.end(null), {
				name: 'TypeError',
				message: 'Invalid "handlers[0]", one "function" expected.',
			});
		});

		it('should throw if receiver finished.', async function () {
			const receiver = await fetcher.request();

			await receiver.end();

			assert.throws(() => receiver.end(), {
				name: 'SackError',
				message: 'Receiver has been finished.',
			});
		});

		it('should get return value what parser returns.', async function () {
			const receiver = await fetcher.request();
			const target = {};

			assert.equal(await receiver.end(() => target), target);
		});

		it('should ensure to consume all response clone.', async function () {
			const receiver = await fetcher.request();
			const handler = receiver => receiver.response.body;
			const parser = receiver => receiver.response.text();

			receiver.use(handler, handler);
			assert.equal(await receiver.end(parser), 'ok');
		});
	});
});
