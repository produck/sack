import * as assert from 'node:assert/strict';
import * as http from 'node:http';
import { describe, it } from 'mocha';

import * as Sack from '../src/index.mjs';

describe('Fetcher', function () {
	it('should new a agent.', function () {
		new Sack.Fetcher();
	});

	it('should throw if bad modifier.', function () {
		assert.throws(() => new Sack.Fetcher(null), {
			name: 'TypeError',
			message: 'Invalid "modifiers[0]", one "function" expected.',
		});
	});

	describe('#WithServer', function () {
		const requestData = { method: null };
		const SetURL = ctx => ctx.url.href = 'http://[::1]:9000';
		const agent = new Sack.Fetcher(SetURL);

		const server = http.createServer((req, res) => {
			requestData.method = req.method;
			res.end('ok');
		});

		this.beforeAll(() => server.listen(9000, '::'));
		this.afterAll(() => server.close());
		this.beforeEach(() => requestData.method = null);

		const TryCustom = ctx => ctx.method = 'CUSTOM';

		describe('.request()', function () {
			it('should return a receiver.', async function () {
				await agent.request();
				assert.deepEqual(requestData, { method: 'GET' });
			});
		});

		describe('.get()', function () {
			it('should return a receiver.', async function () {
				await agent.get(TryCustom);
				assert.deepEqual(requestData, { method: 'GET' });
			});
		});

		describe('.head()', function () {
			it('should return a receiver.', async function () {
				await agent.head(TryCustom);
				assert.deepEqual(requestData, { method: 'HEAD' });
			});
		});

		describe('.post()', function () {
			it('should return a receiver.', async function () {
				await agent.post(TryCustom);
				assert.deepEqual(requestData, { method: 'POST' });
			});
		});

		describe('.put()', function () {
			it('should return a receiver.', async function () {
				await agent.put(TryCustom);
				assert.deepEqual(requestData, { method: 'PUT' });
			});
		});

		describe('.delete()', function () {
			it('should return a receiver.', async function () {
				await agent.delete(TryCustom);
				assert.deepEqual(requestData, { method: 'DELETE' });
			});
		});
	});
});
