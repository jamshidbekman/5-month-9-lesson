import jwt from "jsonwebtoken";
class jwtService {
  constructor() {}
  generateToken(userId) {
    const key = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ userId }, key, {
      expiresIn: "24h",
    });
    return token;
  }
  checkToken(token) {
    const key = process.env.JWT_SECRET_KEY;
    const checkToken = jwt.verify(token, key);
    return checkToken;
  }
}

export default jwtService;
