import * as t from "../../../lib";

describe("tSTypeAliasDeclaration", function () {
  it("type Test = 1 | 'test' | true", function () {
    t.tSTypeAliasDeclaration(
      t.identifier("Test"),
      undefined,
      t.tsUnionType([
        t.tsLiteralType(t.NumericLiteral(1)),
        t.tsLiteralType(t.StringLiteral("test")),
        t.tsLiteralType(t.BooleanLiteral(true)),
      ]),
    );
  });

  it("type Test = 1 | -1", function () {
    t.tSTypeAliasDeclaration(
      t.identifier("Test"),
      undefined,
      t.tsUnionType([
        t.tsLiteralType(t.NumericLiteral(1)),
        t.tsLiteralType(t.unaryExpression("-", t.NumericLiteral(1))),
      ]),
    );
  });

  it("type Test = 1 | -'test'", function () {
    expect(() =>
      t.tSTypeAliasDeclaration(
        t.identifier("Test"),
        undefined,
        t.tsUnionType([
          t.tsLiteralType(t.NumericLiteral(1)),
          t.tsLiteralType(t.unaryExpression("-", t.StringLiteral("test"))),
        ]),
      ),
    ).toThrow(
      'Property literal of TSLiteralType expected node to be of a type ["NumericLiteral","StringLiteral","BooleanLiteral","BigIntLiteral"] but instead got "-StringLiteral"',
    );
  });
});
