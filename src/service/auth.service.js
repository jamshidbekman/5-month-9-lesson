import Joi from "joi";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";
import jwtService from "./jwt.service.js";

class AuthService {
  constructor() {
    this.userModel = UserModel;
    this.jwtService = new jwtService();
  }
  async register(body) {
    const validateUser = Joi.object({
      username: Joi.string().min(5).max(15).required(),
      password: Joi.string().min(6).max(20).required(),
      name: Joi.string().min(2).max(15).required(),
      phone_number: Joi.string().regex(/^\+998(90|91|93|94|95|97|99|88|33|77|78|71)\d{7}$/),
    });

    const { error } = validateUser.validate(body);

    if (error) {
      throw new Error(error.message);
    }

    const foundUser = await this.userModel.findOne({ username: body.username });

    if (foundUser !== null) {
      throw new Error("Username already been existed");
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);
    const user = this.userModel.create({ ...body, password: hashedPassword });
    const token = this.jwtService.generateToken(user._id);

    if (user) {
      return {
        token,
      };
    }
  }
  async login({ username, password }) {
    const foundUser = await this.userModel.findOne({ username: username });

    if (foundUser === null) {
      throw new Error("Username or password incorrect");
    }

    const comparePassword = await bcrypt.compare(password, foundUser.password);
    if (!comparePassword) {
      throw new Error("Username or password incorrect");
    }

    const token = this.jwtService.generateToken(foundUser._id);
    return {
      token,
    };
  }
}

export default AuthService;
