import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    // Cria especialidades
    const specialties = await Promise.all(
        ['Ortodontia', 'Implantodontia', 'Endodontia'].map((specialityName) =>
            prisma.speciality.create({
                data: { name: specialityName },
            })
        )
    );

    // Cria serviços
    const services = await Promise.all(
        ['Limpeza', 'Consulta', 'Canal', 'Clareamento'].map((serviceName) =>
            prisma.service.create({
                data: { name: serviceName },
            })
        )
    );

    // Cria usuários (pacientes e médicos)
    for (let i = 0; i < 10; i++) {
        const isDoctor = i % 2 === 0;

        const user = await prisma.user.create({
            data: {
                email: faker.internet.email(),
                password: faker.internet.password(),
                name: faker.name.fullName(),
                role: isDoctor ? 'DOCTOR' : 'USER',
                profilePicture: faker.image.avatar(),
                doctor: isDoctor
                    ? {
                        create: {
                            specialties: {
                                connect: {
                                    id: specialties[Math.floor(Math.random() * specialties.length)].id,
                                },
                            },
                            services: {
                                connect: {
                                    id: services[Math.floor(Math.random() * services.length)].id,
                                },
                            },
                        },
                    }
                    : undefined,
            },
        });

        // Cria consultas para o paciente
        if (!isDoctor) {
            await prisma.appointment.create({
                data: {
                    userId: user.id,
                    doctorId: (await prisma.doctor.findFirst())?.id!,
                    serviceId: services[Math.floor(Math.random() * services.length)].id,
                    date: faker.date.soon(),
                    status: 'PENDING',
                },
            });
        }

        // Cria posts de blog para médicos
        if (isDoctor) {
            const doctor = await prisma.doctor.findUnique({
                where: { userId: user.id },
            });

            if (doctor) {
                await prisma.blogPost.create({
                    data: {
                        title: faker.lorem.sentence(),
                        content: faker.lorem.paragraphs(2),
                        doctorId: doctor.id,
                    },
                });
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
