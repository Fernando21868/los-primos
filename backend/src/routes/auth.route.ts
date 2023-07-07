import passport from "passport";
import { NextFunction, Router } from "express";
import { Request, Response } from "express";

const router = Router();

router.get("/auth/login/success", (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/login/failed", (req: Request, res: Response) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login/failed" }),
  (req: Request, res: Response) => {
    res.redirect(process.env.CLIENT_URL!);
  }
);

router.get(
  "/auth/logout",
  (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(process.env.CLIENT_URL!);
    });
  }
);

export { router };
