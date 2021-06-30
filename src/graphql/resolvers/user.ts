import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import UserModel from "../../models/user";
import {
  UserResponse,
  UserLoginInput,
  UserRegisterInput,
} from "../schema/user";
import activateAccount from "../../utils/email-templates/activate-account";
import bcrypt from "bcrypt";
import mailer, { MailDataRequired } from "@sendgrid/mail";

@Resolver()
export class UserResolver {
  @Query(() => UserResponse)
  async me(@Ctx() { req }) {
    if (!req.session.userId) {
      return {
        errors: [{ field: "login", error: "No está logueado" }],
      };
    }

    const user = await UserModel.findOne({ _id: req.session.userId });

    return { user };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserRegisterInput,
    @Ctx() { req }
  ): Promise<UserResponse> {
    const { username, password, metadata } = options;

    const checkUser = await UserModel.exists({ username });

    if (checkUser)
      return {
        errors: [{ field: "username", error: "Usuario ya registrado" }],
      };

    const hash = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      password: hash,
      metadata,
      role: process.env.DEFAULT_ROLE,
    });

    await newUser.save();

    mailer.setApiKey(process.env.SENDGRID_KEY || "");

    let dt = new Date();
    dt.setTime(dt.getTime() + 24 * 60 * 60 * 1000);

    const email: MailDataRequired = {
      to: (metadata?.email as string) || "",
      from: process.env.SENGRID_EMAIL || "",
      subject: "Activación de cuenta en Lierno App ✔",
      html: activateAccount
        .replace("|USERNAME|", username)
        .replace(
          "|URL|",
          `${process.env.CLIENT_URL}activate/${newUser._id}?exp=${dt}`
        )
        .replace("|DATE|", `${new Date().getFullYear()}`),
    };

    await mailer.send(email);

    req.session.userId = newUser._id;

    return { user: newUser };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UserLoginInput,
    @Ctx() { req }
  ): Promise<UserResponse> {
    const { username, password } = options;

    const user = await UserModel.findOne({ username });

    if (!user)
      return { errors: [{ field: "username", error: "Usuario no existe" }] };

    const match: boolean = await bcrypt.compare(password, user.password);

    if (!match)
      return {
        errors: [{ field: "password", error: "Contraseña incorrecta" }],
      };

    req.session.userId = user._id;
    req.session.roles = user.role;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        if (err) return resolve(false);

        res.clearCookie("qid");
        resolve(true);
      })
    );
  }
}
