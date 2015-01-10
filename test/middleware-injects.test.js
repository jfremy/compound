
describe('middleware-inject', function() {
describe('Compound.injectMiddleware{At,Before,After}', function() {

    var app, compound;

    before(function () {
        app = getApp();
        compound = app.compound;
    });

    beforeEach(function() {
        app._router.stack = [
            {handle: function zero() {}},
            {handle: function first() {}},
            {handle: function second() {}},
            {handle: function third() {}},
            {handle: function fourth() {}}
        ];
    });

    it('should inject middleware at position', function() {
        compound.injectMiddlewareAt(1, function my() {});
        app._router.stack.length.should.equal(6);
        app._router.stack[1].handle.name.should.equal('my');
        app._router.stack[2].handle.name.should.equal('first');
        app._router.stack[3].handle.name.should.equal('second');
        app._router.stack[4].handle.name.should.equal('third');
        app._router.stack[5].handle.name.should.equal('fourth');
    });

    it('should inject to end when falsy or too high', function() {
        compound.injectMiddlewareAt(100, function my() {});
        app._router.stack.length.should.equal(6);
        app._router.stack[5].handle.name.should.equal('my');
    });

    it('should should inject to beginning when position le 0', function() {
        compound.injectMiddlewareAt(0, function my() {});
        app._router.stack.length.should.equal(6);
        app._router.stack[0].handle.name.should.equal('my');
        compound.injectMiddlewareAt(0, function nega() {});
        app._router.stack.length.should.equal(7);
        app._router.stack[0].handle.name.should.equal('nega');
        app._router.stack[1].handle.name.should.equal('my');
    });

    it('should inject middleware before name', function() {
        compound.injectMiddlewareBefore('third', function twoAndHalf() {});
        app._router.stack.length.should.equal(6);
        app._router.stack[3].handle.name.should.equal('twoAndHalf');
        app._router.stack[4].handle.name.should.equal('third');
        app._router.stack[5].handle.name.should.equal('fourth');
    });

    it('should inject middleware before function', function() {
        var second = app._router.stack[2].handle;
        compound.injectMiddlewareBefore(second, function mymid() {});
        app._router.stack.length.should.equal(6);
        app._router.stack[2].handle.name.should.equal('mymid');
        app._router.stack[3].handle.name.should.equal('second');
        app._router.stack[4].handle.name.should.equal('third');
        app._router.stack[5].handle.name.should.equal('fourth');
    });

    it('should inject middleware after name', function() {
        compound.injectMiddlewareAfter('third', function threeAndHalf() {});
        app._router.stack.length.should.equal(6);
        app._router.stack[3].handle.name.should.equal('third');
        app._router.stack[4].handle.name.should.equal('threeAndHalf');
        app._router.stack[5].handle.name.should.equal('fourth');
    });

});
});
