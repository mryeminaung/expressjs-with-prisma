import { prisma } from "../config/prisma";

export const getProposals = async (req, res) => {
	try {
		const proposals = await prisma.proposal.findMany();
		res.json({ message: "success", data: proposals });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to fetch proposals", error: error.message });
	}
};

export const getProposal = async (req, res) => {
	try {
		const proposal = await prisma.proposal.findFirst({
			where: { id: Number(req.params.proposalId) },
		});

		if (!proposal)
			res
				.status(404)
				.json({ message: "Proposal doesn't exit or already deleted" });
		res.json({ message: "success", data: proposal });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to fetch todo", error: error.message });
	}
};

export const createProposal = async (req, res) => {
	try {
		const data = req.body;
		const proposal = await prisma.proposal.create({
			data,
		});
		res.status(201).json({ message: "success", data: proposal });
	} catch (error) {
		res
			.status(400)
			.json({ message: "Failed to create proposal", error: error.message });
	}
};

export const updateProposal = async (req, res) => {
	try {
		const todo = await prisma.proposal.update({
			where: { id: Number(req.params.proposalId) },
			data: req.body,
		});
		res.json({ message: "success", data: todo });
	} catch (error) {
		res.status(400).json({ message: "Update failed", error: error.message });
	}
};

export const deleteProposal = async (req, res) => {
	try {
		await prisma.proposal.delete({
			where: { id: Number(req.params.proposalId) },
		});
		res.status(200).json({ message: "Proposal deleted successfully" });
	} catch (error) {
		res.status(404).json({ message: "Proposal not found or already deleted" });
	}
};
