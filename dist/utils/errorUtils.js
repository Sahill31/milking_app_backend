"use strict";
// Type guard utility for safe error handling
// Reusable across controllers without using 'any'
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = exports.isError = void 0;
const isError = (error) => {
    return error instanceof Error;
};
exports.isError = isError;
// Helper to safely get error message
const getErrorMessage = (error) => {
    if ((0, exports.isError)(error)) {
        return error.message;
    }
    return 'Unknown error occurred';
};
exports.getErrorMessage = getErrorMessage;
