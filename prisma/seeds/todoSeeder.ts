import { prisma } from "@/config/prisma";
import { faker } from "@faker-js/faker";

const todoSeeder = async () => {
	const todoData = [];

	for (let i = 0; i <= 10; i++) {
		let title = faker.lorem.sentence();
		let completed = i % 2 === 0;
		todoData.push({ title, completed });
	}

	console.log("Seeding started...");
	await prisma.todo.createMany({ data: todoData });
	console.log("Todo seeding done.");
};

export default todoSeeder;
