require('./test_helper.js');
(function() {
    "use strict";
    var q = QUnit;

    q.test('Parser', function() {
        var ast = Seqdiag.Parser.parse("seqdiag {\n" + 
            "A[label = \"aaa\", foo = \"bar\"];\n" +
            "B[label = \"あいうえお\"];\n" +
            "A -> B [ label = \"A to B\" ];" +
            "B --> A;" +
        "}");

        q.ok(ast instanceof Array, "should return tuple");
        q.equal(ast[0], "graph", "token should be graph");

        q.ok(ast[1] instanceof Object, "graph has token attribute");
        q.equal(ast[1]["id"], "seqdiag", "graph attribute should have 'id'");

        q.ok(ast[1]["stmt"] instanceof Array, "graph attribute should have stmt");

        // for node A
        q.equal(ast[1]["stmt"][0][0], "node", "first statement should be node");
        q.equal(typeof ast[1]["stmt"][0][1] , "object", "node should have attributes");
        q.equal(ast[1]["stmt"][0][1]["id"], "A", "node id should be A");
        q.ok(ast[1]["stmt"][0][1]["attributes"] instanceof Array, "node should have attributes");

        // for node A's attribute
        q.equal(ast[1]["stmt"][0][1]["attributes"][0], "attributes", "it should be attribute token");
        q.deepEqual(ast[1]["stmt"][0][1]["attributes"][1], { "label": "aaa", "foo": "bar" }, "attirbute values ok");

        // for node B
        q.equal(ast[1]["stmt"][1][0], "node", "first statement should be node");
        q.equal(typeof ast[1]["stmt"][1][1] , "object", "node should have attributes");
        q.equal(ast[1]["stmt"][1][1]["id"], "B", "node id should be B");
        q.ok(ast[1]["stmt"][1][1]["attributes"] instanceof Array, "node should have attributes");

        // for node B's attribute
        q.equal(ast[1]["stmt"][1][1]["attributes"][0], "attributes", "it should be attribute token");
        q.deepEqual(ast[1]["stmt"][1][1]["attributes"][1], { "label": "あいうえお" }, "attirbute values ok");

        // for edge A -> B
        q.equal(ast[1]["stmt"][2][0], "edge", "edge ok");
        q.equal(ast[1]["stmt"][2][1], "normal", "edge ok");
        q.equal(ast[1]["stmt"][2][2], "A", "edge left side OK");
        q.equal(ast[1]["stmt"][2][3], "B", "edge right side OK");
        q.deepEqual(ast[1]["stmt"][2][4], ["attributes", { "label": "A to B" }], "edge has attributes");

        // for edge B --> A
        q.equal(ast[1]["stmt"][3][0], "edge", "edge ok");
        q.equal(ast[1]["stmt"][3][1], "dotted", "edge ok");
        q.equal(ast[1]["stmt"][3][2], "B", "edge left side OK");
        q.equal(ast[1]["stmt"][3][3], "A", "edge right side OK");
        q.equal(ast[1]["stmt"][3][4], null, "edge has not attributes ");
    });

    q.start();
})();

