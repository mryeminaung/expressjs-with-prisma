import express from "express";
import {
	createProposal,
	deleteProposal,
	getProposal,
	getProposals,
	updateProposal,
} from "../controllers/proposalController";

const router = express.Router();

router.get("/", getProposals);
router.get("/:proposalId", getProposal);
router.post("/", createProposal);
router.put("/:proposalId", updateProposal);
router.delete("/:proposalId", deleteProposal);

export default router;
