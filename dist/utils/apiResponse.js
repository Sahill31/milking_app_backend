"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (data) => ({
    success: true,
    data,
});
exports.successResponse = successResponse;
const errorResponse = (message) => ({
    success: false,
    message,
});
exports.errorResponse = errorResponse;
