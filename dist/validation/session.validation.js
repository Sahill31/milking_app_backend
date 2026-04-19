"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endSessionSchema = exports.createSessionSchema = void 0;
const zod_1 = require("zod");
exports.createSessionSchema = zod_1.z.object({
    start_time: zod_1.z.string().datetime(),
});
exports.endSessionSchema = zod_1.z
    .object({
    milk_quantity: zod_1.z.coerce.number().min(0),
    notes: zod_1.z.string().optional(),
})
    .strict();
