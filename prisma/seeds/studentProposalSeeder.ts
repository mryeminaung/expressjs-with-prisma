import { prisma } from "@/config/prisma";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const studentProposalSeeder = async () => {
	console.log("Seeding started...");
	const hashPwd = await bcrypt.hash("password", 10);
	for (let i = 0; i <= 10; i++) {
		let name = faker.person.fullName();
		await prisma.student.create({
			data: {
				name,
				email: faker.internet
					.email({ firstName: name, provider: "miit.edu.mm" })
					.toLowerCase(),
				password: hashPwd,
				proposals: {
					create: [
						{
							title: faker.lorem.sentence(),
							description: faker.lorem.paragraph(),
							status: "PENDING",
							submittedAt: faker.date.anytime(),
						},
						{
							title: faker.lorem.sentence(),
							description: faker.lorem.paragraph(),
							status: "APPROVED",
							submittedAt: faker.date.anytime(),
						},
					],
				},
			},
		});
	}
	console.log("Student and Proposal seeding done.");
};

export default studentProposalSeeder;
