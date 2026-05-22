import { Router } from "express";
import {
    DocAPI,
    getLocalidades,
    getLocalidadById,
    buscarLocalidad
} from "../controller/controller.js";

const router = Router();

router.get("/",DocAPI);
router.get("/localidades",getLocalidades);
router.get("/localidades/:id",getLocalidadById);
router.get("/localidades/buscar", buscarLocalidad);

export default router;