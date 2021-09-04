import { hello2 } from "./hello-world";

var myInt = 2

describe("Custom test", () => {
    test("do what I want it to do...", () => {
        expect(hello2(myInt)).toEqual(myInt+1);
    });
});