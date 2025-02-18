import * as assert from 'node:assert/strict';
import * as http from 'node:http';
import { describe, it } from 'mocha';

import * as Sack from '@produck/sack';

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
		function SetURL(ctx, next) {
			ctx.url.href = 'http://[::1]:9000';

			return next();
		}

		const requestData = { method: null };
		const agent = new Sack.Fetcher(SetURL);

		const server = http.createServer((req, res) => {
			requestData.method = req.method;
			res.end('ok');
		});

		this.beforeAll(() => server.listen(9000, '::'));
		this.afterAll(() => server.close());
		this.beforeEach(() => requestData.method = null);

		describe('.request()', function () {
			it('should return a receiver.', async function () {
				await agent.request();
				assert.deepEqual(requestData, { method: 'GET' });
			});
		});

		describe('.get()', function () {
			it('should return a receiver.', async function () {
				await agent.get();
				assert.deepEqual(requestData, { method: 'GET' });
			});
		});

		describe('.head()', function () {
			it('should return a receiver.', async function () {
				await agent.head();
				assert.deepEqual(requestData, { method: 'HEAD' });
			});
		});

		describe('.post()', function () {
			it('should return a receiver.', async function () {
				await agent.post();
				assert.deepEqual(requestData, { method: 'POST' });
			});
		});

		describe('.put()', function () {
			it('should return a receiver.', async function () {
				await agent.put();
				assert.deepEqual(requestData, { method: 'PUT' });
			});
		});

		describe('.delete()', function () {
			it('should return a receiver.', async function () {
				await agent.delete();
				assert.deepEqual(requestData, { method: 'DELETE' });
			});
		});
	});
});
