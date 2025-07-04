import { Router } from "express";
import {
    createMission,
    getAllMissions,
    getMissionById,
    updateMission,
    deleteMission
} from "../controllers/mission.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin from"../middlewares/isAdmin.js";

const router =Router();
router.use(verifyJWT);

router.route("/")
    .post(isAdmin,createMission)
    .get(isAdmin,getAllMissions);
router.route("/:id")
    .get(getMissionById)
    .put(isAdmin, updateMission)
    .delete(isAdmin,deleteMission);

export default router;