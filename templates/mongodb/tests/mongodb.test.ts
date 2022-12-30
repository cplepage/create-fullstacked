import {describe, it} from "mocha";
import {ok} from "assert";
import testIntegration from "fullstacked/utils/testIntegration";

import Mongo from "../server/mongodb";

testIntegration(describe("MongoDB Template Tests", function(){
    it('Should get connection', async function(){
        const mongo = new Mongo();
        const connection = await mongo.getConnection();
        ok(connection);
        await connection.close();
    });
}));
