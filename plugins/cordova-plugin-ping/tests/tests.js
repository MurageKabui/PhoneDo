
exports.defineAutoTests = function () {
	describe('Ping (window.Ping)', function () {
		it('should exist', function (done) {
			expect(window.Ping).toBeDefined();
			done();
		});
	});

	describe('Success callback', function () {
		it('should take an argument that is an array of results (for existing domain)', function (done) {
			var p, success, err;
			p = new window.Ping();
			success = function (r) {
				expect(r).toBeDefined();
				expect(r.length > 0).toBe(true);
				expect(r[0].response.result.pctTransmitted).toBe('3');
				expect(r[0].response.result.pctReceived).toBe('3');
				expect(r[0].response.result.pctLoss).toBe('0%');
				expect(r[0].response.result.target).toBe('github.com');
				expect(r[0].response.status).toBe('success');
				done();
			};
			err = function (e) {
				console.log(e);
			};
			p.ping([{query: 'github.com', timeout: 1, retry: 3, version: 'v4'}], success, err);
		});

		it('should take an argument that is an array of results (for un-existing domain)', function (done) {
			var p, success, err;
			p = new window.Ping();
			success = function (r) {
				expect(r).toBeDefined();
				expect(r.length > 0).toBe(true);
				expect(r[0].response.result.pctTransmitted).toBe('3');
				expect(r[0].response.result.pctReceived).toBe('0');
				expect(r[0].response.result.pctLoss).toBe('100%');
				expect(r[0].response.result.target).toBe('undefineddomain.com');
				expect(r[0].response.status).toBe('timeout');
				done();
			};
			err = function (e) {
				console.log(e);
			};
			p.ping([{query: 'undefineddomain.com', timeout: 1, retry: 3, version: 'v6'}], success, err);
		});
	});
};
