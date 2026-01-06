import { prisma } from "@/config/prisma";
import studentProposalSeeder from "./studentProposalSeeder";
import todoSeeder from "./todoSeeder";

async function main() {
	await todoSeeder();
	await studentProposalSeeder();
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
