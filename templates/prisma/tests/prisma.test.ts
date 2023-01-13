import {before, describe, it} from "mocha";
import {equal, ok} from "assert";
import testIntegration from "fullstacked/utils/testIntegration";

testIntegration(describe("Prisma Template Tests", function(){
    let prisma;

    before(async function() {
        this.timeout(100000);
        prisma = (await import("../server/prisma")).default;
        await prisma.init(!process.argv.includes("--debug"));
    })

    it('Should create, read, delete in db', async function(){
        this.timeout(100000);
        const name = "test";
        await prisma.client.example.create({
            data: {
                name
            }
        });
        ok((await prisma.client.example.findMany()).find(item => item.name === name));
        await prisma.client.example.delete({
            where: {
                name
            }
        });
        equal((await prisma.client.example.findMany()).length, 0);
    });
}));
