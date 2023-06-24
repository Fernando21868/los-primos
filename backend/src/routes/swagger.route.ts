import { Router } from "express";
import swaggerUi, { serve, setup } from "swagger-ui-express";
import swaggerDocument from "../../losPrimos.json";

const router = Router();

router.use("/api-docs", serve);
router.get("/api-docs", setup(swaggerDocument));

export { router };
