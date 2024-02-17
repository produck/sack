import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import { SackAgentRequestContext } from '../src/Context.mjs';

describe('Context', function () {
	it('should new a context', function () {
		new SackAgentRequestContext();
	});

	describe('.options', function () {
		it('should get a request init object.', function () {
			const url = new URL('http://example.com');
			const context = new SackAgentRequestContext();

			new Request(url, context.options);
		});
	});

	describe('.use()', function () {
		const context = new SackAgentRequestContext();

		it('should use a empty handler list.', function () {
			context.use();
		});

		it('should use a function as handler.', function () {
			context.use(() => {});
		});

		it('should throw if bad hanlder.', function () {
			assert.throws(() => context.use(null), {
				name: 'TypeError',
				message: 'Invalid "handlers[0]", one "Function" expected.',
			});
		});
	});

	describe('.finalize()', function () {
		const context = new SackAgentRequestContext();

		it('should finalize a key', function () {
			context.finalize('method');
		});

		it('should throw if bad key.', function () {
			assert.throws(() => context.finalize(), {
				name: 'TypeError',
				message: 'Invalid "key", one "request init key" expected.',
			});
		});
	});

	describe('.finalizeAll()', function () {
		const context = new SackAgentRequestContext();

		it('should finalize all keys.', function () {
			context.finalizeAll();
		});
	});

	describe('.url', function () {
		it('should get a url.', function () {
			assert.ok(new SackAgentRequestContext().url instanceof URL);
		});
	});

	describe('.headers', function () {
		it('should get a headers.', function () {
			assert.ok(new SackAgentRequestContext().headers instanceof Headers);
		});
	});

	describe('.body', function () {
		it('should get a null as default.', function () {
			assert.equal(new SackAgentRequestContext().body, null);
		});

		it('should set a string.', function () {
			new SackAgentRequestContext().body = 'foo';
		});

		it('should throw if bad body.', function () {
			assert.throws(() => new SackAgentRequestContext().body = true, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.body", one "/,
			});
		});
	});

	describe('.cache', function () {
		it('should get default value.', function () {
			assert.equal(new SackAgentRequestContext().cache, 'default');
		});

		it('should set a valid value..', function () {
			for (const value of [
				'default', 'no-store', 'reload', 'no-cache',
				'force-cache', 'only-if-cached',
			]) {
				new SackAgentRequestContext().cache = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => new SackAgentRequestContext().cache = true, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.cache", one "/,
			});
		});
	});

	describe('.credentials', function () {
		it('should get default value.', function () {
			assert.equal(new SackAgentRequestContext().credentials, 'same-origin');
		});

		it('should set a valid value..', function () {
			for (const value of ['omit', 'same-origin', 'include']) {
				new SackAgentRequestContext().credentials = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => new SackAgentRequestContext().credentials = true, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.credentials", one "/,
			});
		});
	});

	describe('.integrity', function () {
		it('should get default value.', function () {
			assert.equal(new SackAgentRequestContext().integrity, '');
		});

		it('should set a valid value..', function () {
			for (const value of ['', 'sha256-foo']) {
				new SackAgentRequestContext().integrity = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => new SackAgentRequestContext().integrity = true, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.integrity", one "/,
			});
		});
	});

	describe('.keepalive', function () {
		it('should get default value.', function () {
			assert.equal(new SackAgentRequestContext().keepalive, false);
		});

		it('should set a valid value..', function () {
			for (const value of [false, true]) {
				new SackAgentRequestContext().keepalive = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => new SackAgentRequestContext().keepalive = null, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.keepalive", one "/,
			});
		});
	});

	describe('.method', function () {
		it('should get default value.', function () {
			assert.equal(new SackAgentRequestContext().keepalive, false);
		});

		it('should set a valid value..', function () {
			for (const value of [false, true]) {
				new SackAgentRequestContext().keepalive = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => new SackAgentRequestContext().keepalive = null, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.keepalive", one "/,
			});
		});
	});

	describe('.mode', function () {
		it('should get default value.', function () {
			assert.equal(new SackAgentRequestContext().mode, 'cors');
		});

		it('should set a valid value..', function () {
			for (const value of ['same-origin', 'no-cors', 'cors']) {
				new SackAgentRequestContext().mode = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => new SackAgentRequestContext().mode = null, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.mode", one "/,
			});
		});
	});

	describe('.priority', function () {
		it('should get default value.', function () {
			assert.equal(new SackAgentRequestContext().priority, 'auto');
		});

		it('should set a valid value..', function () {
			for (const value of ['high', 'low', 'auto']) {
				new SackAgentRequestContext().priority = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => new SackAgentRequestContext().priority = null, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.priority", one "/,
			});
		});
	});

	describe('.redirect', function () {
		it('should get default value.', function () {
			assert.equal(new SackAgentRequestContext().redirect, 'follow');
		});

		it('should set a valid value..', function () {
			for (const value of ['follow', 'error', 'manual']) {
				new SackAgentRequestContext().redirect = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => new SackAgentRequestContext().redirect = null, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.redirect", one "/,
			});
		});
	});

	describe('.referrer', function () {
		it('should get default value.', function () {
			assert.equal(new SackAgentRequestContext().referrer, 'about:client');
		});

		it('should set a valid value..', function () {
			for (const value of ['about:client', 'http://example.com']) {
				new SackAgentRequestContext().referrer = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => new SackAgentRequestContext().referrer = null, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.referrer", one "/,
			});
		});
	});

	describe('.referrerPolicy', function () {
		it('should get default value.', function () {
			assert.equal(new SackAgentRequestContext().referrerPolicy, '');
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
				new SackAgentRequestContext().referrerPolicy = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => new SackAgentRequestContext().referrerPolicy = null, {
				name: 'TypeError',
				message: /^Invalid "RequestContext.referrerPolicy", one "/,
			});
		});
	});

	describe('.signal', function () {
		it('should get default value.', function () {
			assert.equal(new SackAgentRequestContext().signal, null);
		});

		it('should set a valid value..', function () {
			for (const value of [null, AbortSignal.timeout(10000)]) {
				new SackAgentRequestContext().signal = value;
			}
		});

		it('should throw if bad value.', function () {
			assert.throws(() => new SackAgentRequestContext().signal = '', {
				name: 'TypeError',
				message: /^Invalid "RequestContext.signal", one "/,
			});
		});
	});
});
