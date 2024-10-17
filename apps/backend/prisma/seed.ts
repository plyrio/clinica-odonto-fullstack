import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    // Criação das especialidades e serviços
    const specialties = await Promise.all(
        ['Ortodontia', 'Implantodontia', 'Endodontia', 'Periodontia', 'Prótese', 'Odontopediatria', 'Estética'].map(
            async (specialityName) => {
                return prisma.speciality.upsert({
                    where: { name: specialityName },
                    update: {},
                    create: { name: specialityName },
                });
            }
        )
    );

    const services = await Promise.all(
        [
            { name: 'Limpeza', slots: 5 },
            { name: 'Consulta', slots: 3 },
            { name: 'Canal', slots: 2 },
            { name: 'Clareamento', slots: 4 },
            { name: 'Extração', slots: 2 },
            { name: 'Restauração', slots: 3 },
            { name: 'Aparelho Dentário', slots: 1 },
            { name: 'Facetas', slots: 2 },
        ].map(async ({ name, slots }) => {
            return prisma.service.upsert({
                where: { name: name },
                update: {},
                create: { name: name, imgUrl: faker.image.avatar(), slots: slots },
            });
        })
    );

    const employees: any[] = [];

    for (let i = 0; i < 20; i++) {
        const isEmployee = i < 8;

        // Criação do usuário (funcionário ou paciente)
        const user = await prisma.user.create({
            data: {
                email: faker.internet.email(),
                password: faker.internet.password(),
                name: faker.person.fullName(),
                role: 'USER',
                imgUrl: faker.image.avatar(),
                employee: isEmployee
                    ? {
                        create: {
                            role: faker.helpers.arrayElement(['DOCTOR', 'NURSE', 'RECEPTIONIST']),
                            specialties: {
                                connect: specialties
                                    .sort(() => 0.5 - Math.random())
                                    .slice(0, Math.floor(Math.random() * specialties.length) + 1)
                                    .map((speciality) => ({ id: speciality.id })),
                            },
                            services: {
                                connect: services
                                    .sort(() => 0.5 - Math.random())
                                    .slice(0, Math.floor(Math.random() * services.length) + 1)
                                    .map((service) => ({ id: service.id })),
                            },
                        },
                    }
                    : undefined,
            },
        });

        if (isEmployee) {
            employees.push(user);
            console.log(`Funcionário criado: ${user.id} - ${user.name}`);

            // Criar postagem de blog com uma chance de 70%
            if (Math.random() < 0.7) {
                const employee = await prisma.employee.findUnique({ where: { userId: user.id } });
                if (employee) {
                    await prisma.blogPost.create({
                        data: {
                            title: faker.lorem.sentence(),
                            content: faker.lorem.paragraphs(2),
                            employeeId: employee.id,
                            imgUrl: faker.image.avatar(),
                        },
                    });
                    console.log(`Post criado para o funcionário: ${employee.id}`);
                }
            }
        } else {
            console.log(`Usuário criado: ${user.id} - ${user.name}`);

            // Criar agendamentos com chance de 50%
            if (Math.random() < 0.5) {
                const randomAppointments = Math.floor(Math.random() * 5) + 1;
                for (let j = 0; j < randomAppointments; j++) {
                    const employeeId = employees[Math.floor(Math.random() * employees.length)].id;

                    console.log(`Criando consulta para usuário ${user.id} com funcionário ${employeeId}`);

                    await prisma.appointment.create({
                        data: {
                            userId: user.id,
                            employeeId: employeeId,
                            serviceId: services[Math.floor(Math.random() * services.length)].id,
                            date: faker.date.soon({ days: 30 }),
                            status: 'PENDING',
                        },
                    });
                }
            } else {
                console.log(`Usuário ${user.id} não tem agendamentos`);
            }
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
