import { NextFunction, Request, Response } from "express";


/**
 * Ensure user is authenticated befor perform any action to the database
 * @date 7/27/2023 - 1:25:42 AM
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {*}
 */
export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
}
