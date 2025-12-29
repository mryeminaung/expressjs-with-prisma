import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const connectDB = async () => {
	try {
		await prisma.$connect();
		console.log("DB Connected via Prisma");
	} catch (error: any) {
		console.error(`Database connection error: ${error.message}`);
		process.exit(1);
	}
};

const disconnectDB = async () => {
	await prisma.$disconnect();
};

export { connectDB, disconnectDB, prisma };
