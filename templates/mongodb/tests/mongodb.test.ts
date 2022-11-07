import {describe, it} from "mocha";
import Helper from "fullstacked/tests/integration/Helper";
import {ok} from "assert";
import * as path from "path";
import Mongo from "../server/mongodb";

Helper(describe("MongoDB Template Tests", function(){
    it('Should get connection', async function(){
        const mongo = new Mongo();
        const connection = await mongo.getConnection();
        ok(connection);
        await connection.close();
    });
}), path.resolve(__dirname, ".."));
