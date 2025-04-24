import { Request, Response } from "express";
import { UserService } from "../service/user.service";
import bcrypt from "bcrypt";
import { json } from "sequelize";
import { ImageService } from "../config/upload-image";
import path from "path";

export class UserController {
  constructor() {}

  async getUser(req: Request, res: Response) {
    const dataUser: any = req.headers.dataUser;

    const user = {
      id: dataUser.id,
      name: dataUser.name,
      role: dataUser.role,
    };

    res.status(201).json({
      ok: true,
      user,
    });
  }

  async getAllByUser(req: Request, res: Response) {
    const dataUser: any = req.headers.dataUser;
    const userId = dataUser.id;

    const userService = new UserService();

    try {
      const user = await userService.getAllById(userId);

      res.status(201).json({
        ok: true,
        user,
      });
    } catch (error) {
      console.error("ERROR FIND USER: ", error);
    }
  }

  async update(req: Request, res: Response) {
    const dataUser: any = req.headers.dataUser;
    const userId = dataUser.id;
    const userUpdate = req.body.user;

    const userService = new UserService();

    try {
      await userService.getById(userId);
      const user = await userService.updateUser(
        userUpdate.name,
        userUpdate.username,
        userUpdate.email,
        userUpdate.identification,
        userUpdate.address,
        userUpdate.birthdate
      );

      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      console.error("ERROR FIND USER: ", error);
    }
  }

  async uploadImage(req: Request, res: Response) {
    const dataUser: any = req.headers.dataUser;
    const userId = dataUser.id;
    const userService = new UserService();
    try {
      ImageService.getUploadMiddleware()(req, res, async (err) => {
        if (err) {
          console.error("ERROR AL SUBIR IMAGEN:", err);
          return res.status(400).json({ success: false, message: err.message });
        }

        const file = req.file;
        const oldImage = req.body.oldImage;

        if (file) {
          // Si hay imagen anterior, la eliminamos
          if (oldImage) {
            await ImageService.deleteImage(oldImage).catch(console.error);
          }

          // Obtener ruta relativa para exponer por frontend
          const relativeUrl = ImageService.getRelativeImagePath(file.filename);
          await userService.getById(userId);
          await userService.updateImage(relativeUrl);


          return res.status(200).json({
            success: true,
            message: "Imagen actualizada",
            urlImage: relativeUrl, // Ruta como "/uploads/profile/abc123.jpg"
          });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "No se recibió la imagen" });
        }
      });
    } catch (error) {
        console.error("ERROR UPDATE IMAGE: ", error);
    }
  }

  async createUser(req: Request, res: Response) {
    console.log(req.body);
    const { fullName, username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name: fullName, username, password: hashedPassword, email };

    try {
      const userServices = new UserService();
      await userServices.createUser(user);

      res.status(201).json({
        message: "User created successfully!",
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        message:
          "An error occurred while creating the user. Please try again later.",
      });
    }
  }

  async login(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;

    try {
      if (!email) {
        throw new Error("El email es requerido");
      }

      if (!password) {
        throw new Error("La contraseña es requerida");
      }

      const userService = new UserService();
      const user = await userService.loginUser(email, password);
      return res.status(200).json({
        token: user,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Something went wrong during login",
        error,
      });
    }
  }
}
