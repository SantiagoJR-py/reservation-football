"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerify = void 0;
const jwt_service_1 = require("../service/jwt.service");
function tokenVerify(req, res, next) {
    var _a;
    const jwtService = new jwt_service_1.JwtService();
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const verify = jwtService.verifyToken(token);
        req.headers.dataUser = verify;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}
exports.tokenVerify = tokenVerify;
;
