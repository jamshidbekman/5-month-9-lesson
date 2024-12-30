import AuthService from "../service/auth.service.js";
import jwtService from "../service/jwt.service.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
    this.jwtService = new jwtService();
  }
  async registerController(req, res) {
    try {
      const body = req.body;
      const data = await this.authService.register(body);
      if (data) {
        res.statusCode = 201;
        res.json({
          success: true,
          ...data,
        });
      }
    } catch (error) {
      res.statusCode = 400;
      res.json({
        message: error.message,
        success: false,
      });
    }
  }
  async loginController(req, res) {
    try {
      const body = req.body;
      const data = await this.authService.login(body);
      if (data) {
        res.statusCode = 200;
        res.json({
          success: true,
          ...data,
        });
      }
    } catch (error) {
      res.statusCode = 401;
      res.json({
        message: error.message,
        success: false,
      });
    }
  }
  async checkTokenController(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const checkToken = this.jwtService.checkToken(token);
      if (checkToken) {
        res.statusCode = 200;
        res.json({
          success: true,
        });
      }
    } catch (error) {
      res.statusCode = 401;
      res.json({
        success: false,
      });
    }
  }
}

export default AuthController;
