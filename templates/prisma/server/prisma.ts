import { PrismaClient } from '@prisma/client';
import {maybeInitPrisma} from "./prisma.init";

const client = new PrismaClient();

export default {
    init: maybeInitPrisma,
    client: client
};


