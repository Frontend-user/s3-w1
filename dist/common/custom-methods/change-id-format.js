"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMongoUserId = exports.changeIdFormat = void 0;
const changeIdFormat = (obj) => {
    obj.id = obj._id;
    delete obj._id;
    return obj;
};
exports.changeIdFormat = changeIdFormat;
const deleteMongoUserId = (obj) => {
    delete obj._id;
    delete obj.userId;
    return obj;
};
exports.deleteMongoUserId = deleteMongoUserId;
//# sourceMappingURL=change-id-format.js.map