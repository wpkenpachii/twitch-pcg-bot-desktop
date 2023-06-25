const JSONdb = require('simple-json-db');
const db = new JSONdb('./../');

import { CatchingRules } from "@/database/types/catching-rules.types";

export async function storeAllRules(rule: CatchingRules): Promise<void> {
    try {
        await db.data.push(rule)
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getAllRules(): Promise<CatchingRules[]> {
    try {
        return db.data.read() as CatchingRules[]
    } catch (error: any) {
        throw new Error(error)
    }
}