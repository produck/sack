import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import * as Sack from '@produck/sack';

function SackAgentRequestContext() {
	const fetcher = new Sack.Fetcher();
	/**
	 * @type {Sack.SackAgentRequestContext}
	 */
	let context = null;

	fetcher.request(function extractContext(ctx) {
		context = ctx;
	});

	return context;
}

describe('Context', function () {
	it('should new a context', function () {
		SackAgentRequestContext();
	});

	describe('.options', function () {
		it('should get a request init object.', function () {
			const url = new URL('http://example.com');
			const context = SackAgentRequestContext();

			new Request(url, context.options);
		});
	});

	describe('.use()', function () {
		const context = SackAgentRequestContext();

		it('should use a empty handler list.', function () {
			context.use();
		});

		it('should use a function as handler.', function () {
			context.use(() => {});
		});

		it('should throw if bad hanlder.', function () {
			assert.throws(() => context.use(null), {
				name: 'TypeError',
				message: 'Invalid "handlers[0]", one "function" expected.',
			});
		});
	});

	describe('.url', function () {
		it('should get a url.', function () {
			assert.ok(SackAgentRequestContext().url instanceof URL);
		});
	});

	describe('.headers', function () {
		it('should get a headers.', function () {
			assert.ok(SackAgentRequestContext().headers instanceof Headers);
		});
	});

	describe('.body', function () {
		it('should get a null as default.', function () {
			assert.equal(SackAgentRequestContext().body, null);
		});

		it('should set a string.', function () {
			SackAgentRequestContext().body = 'foo';
		});

		it('should throw if bad body.', function () {
			assert.throws(() => SackAgentRequestContext().body = true, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.body", one "/,
			});
		});
	});

	describe('.cache', function () {
		it('should get default value.', function () {
			assert.equal(SackAgentRequestContext().cache, 'default');
		});

		it('should set a valid value..', function () {
			for (const value of [
				'default', 'no-store', 'reload', 'no-cache',
				'force-cache', 'only-if-cached',
			]) {
				SackAgentRequestContext().cache = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => SackAgentRequestContext().cache = true, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.cache", one "/,
			});
		});
	});

	describe('.credentials', function () {
		it('should get default value.', function () {
			assert.equal(SackAgentRequestContext().credentials, 'same-origin');
		});

		it('should set a valid value..', function () {
			for (const value of ['omit', 'same-origin', 'include']) {
				SackAgentRequestContext().credentials = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => SackAgentRequestContext().credentials = true, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.credentials", one "/,
			});
		});
	});

	describe('.integrity', function () {
		it('should get default value.', function () {
			assert.equal(SackAgentRequestContext().integrity, '');
		});

		it('should set a valid value..', function () {
			for (const value of ['', 'sha256-foo']) {
				SackAgentRequestContext().integrity = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => SackAgentRequestContext().integrity = true, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.integrity", one "/,
			});
		});
	});

	describe('.keepalive', function () {
		it('should get default value.', function () {
			assert.equal(SackAgentRequestContext().keepalive, false);
		});

		it('should set a valid value..', function () {
			for (const value of [false, true]) {
				SackAgentRequestContext().keepalive = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => SackAgentRequestContext().keepalive = null, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.keepalive", one "/,
			});
		});
	});

	describe('.method', function () {
		it('should get default value.', function () {
			assert.equal(SackAgentRequestContext().keepalive, false);
		});

		it('should set a valid value..', function () {
			for (const value of [false, true]) {
				SackAgentRequestContext().keepalive = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => SackAgentRequestContext().keepalive = null, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.keepalive", one "/,
			});
		});
	});

	describe('.mode', function () {
		it('should get default value.', function () {
			assert.equal(SackAgentRequestContext().mode, 'cors');
		});

		it('should set a valid value..', function () {
			for (const value of ['same-origin', 'no-cors', 'cors']) {
				SackAgentRequestContext().mode = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => SackAgentRequestContext().mode = null, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.mode", one "/,
			});
		});
	});

	describe('.priority', function () {
		it('should get default value.', function () {
			assert.equal(SackAgentRequestContext().priority, 'auto');
		});

		it('should set a valid value..', function () {
			for (const value of ['high', 'low', 'auto']) {
				SackAgentRequestContext().priority = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => SackAgentRequestContext().priority = null, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.priority", one "/,
			});
		});
	});

	describe('.redirect', function () {
		it('should get default value.', function () {
			assert.equal(SackAgentRequestContext().redirect, 'follow');
		});

		it('should set a valid value..', function () {
			for (const value of ['follow', 'error', 'manual']) {
				SackAgentRequestContext().redirect = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => SackAgentRequestContext().redirect = null, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.redirect", one "/,
			});
		});
	});

	describe('.referrer', function () {
		it('should get default value.', function () {
			assert.equal(SackAgentRequestContext().referrer, 'about:client');
		});

		it('should set a valid value..', function () {
			for (const value of ['about:client', 'http://example.com']) {
				SackAgentRequestContext().referrer = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => SackAgentRequestContext().referrer = null, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.referrer", one "/,
			});
		});
	});

	describe('.referrerPolicy', function () {
		it('should get default value.', function () {
			assert.equal(SackAgentRequestContext().referrerPolicy, '');
		});

		it('should set a valid value..', function () {
			for (const value of [
				'',
				'no-referrer',
				'no-referrer-when-downgrade',
				'same-origin',
				'origin',
				'strict-origin',
				'origin-when-cross-origin',
				'strict-origin-when-cross-origin',
				'unsafe-url',
			]) {
				SackAgentRequestContext().referrerPolicy = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => SackAgentRequestContext().referrerPolicy = null, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.referrerPolicy", one "/,
			});
		});
	});

	describe('.signal', function () {
		it('should get default value.', function () {
			assert.equal(SackAgentRequestContext().signal, null);
		});

		it('should set a valid value..', function () {
			for (const value of [null, AbortSignal.timeout(10000)]) {
				SackAgentRequestContext().signal = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => SackAgentRequestContext().signal = '', {
				name: 'TypeError',
				message: /^Invalid "RequestContext.signal", one "/,
			});
		});
	});
});
