import passport from "passport";
import { NextFunction, Router } from "express";
import { Request, Response } from "express";

const router = Router();

router.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    res.redirect("/users");
  }
);

router.get("/auth/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export { router };
