import { PrismaClient, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';


const prisma = new PrismaClient();

async function main() {
    // Criação das especialidades
    const specialties = await Promise.all(
        ['Ortodontia', 'Implantodontia', 'Endodontia', 'Periodontia', 'Prótese', 'Odontopediatria', 'Estética'].map(
            async (specialityName) => {
                return prisma.speciality.upsert({
                    where: { name: specialityName },
                    update: {},
                    create: { name: specialityName, description: faker.lorem.paragraph(2) },
                });
            }
        )
    );

    // Criação dos serviços
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
                where: { name },
                update: {},
                create: { name, imgUrl: faker.image.avatar(), slots, description: faker.lorem.paragraph(2) },
            });
        })
    );

    const employees: any[] = [];
    const doctors: any[] = [];

    // Criar 40 usuários
    for (let i = 0; i < 40; i++) {
        const isEmployee = i < 12; // Apenas 12 primeiros são funcionários
        const role = isEmployee
            ? [faker.helpers.arrayElement(['DOCTOR', 'NURSE', 'RECEPTIONIST']) as Role] 
            : ['PATIENT'] as Role[];

        const user = await prisma.user.create({
            data: {
                email: faker.internet.email(),
                password: faker.internet.password(),
                name: faker.person.fullName(),
                bio: faker.lorem.paragraph(2),
                phone: faker.phone.number({ style: 'international' }),
                birthday: faker.date.birthdate(),
                role,
                imgUrl: faker.image.avatar(),
            },
        });

        if (isEmployee) {
            console.log(`Funcionário criado: ${user.id} - ${user.name} (${role})`);

            if (role.includes('DOCTOR')) {
                const assignedSpecialties = specialties
                    .sort(() => 0.5 - Math.random())
                    .slice(0, Math.floor(Math.random() * specialties.length) + 1);

                const assignedServices = services
                    .sort(() => 0.5 - Math.random())
                    .slice(0, Math.floor(Math.random() * services.length) + 1);

                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        specialties: {
                            connect: assignedSpecialties.map((specialty) => ({ id: specialty.id })),
                        },
                        services: {
                            connect: assignedServices.map((service) => ({ id: service.id })),
                        },
                    },
                });

                if (Math.random() < 0.7) {
                    await prisma.blogPost.create({
                        data: {
                            title: faker.lorem.sentence(),
                            content: faker.lorem.paragraphs(2),
                            authorId: user.id,
                            imgUrl: faker.image.avatar(),
                        },
                    });
                    console.log(`Post criado para o médico: ${user.id}`);
                }

                doctors.push(user);
            } else {
                employees.push(user);
            }
        } else {
            console.log(`Usuário criado: ${user.id} - ${user.name}`);
        }
    }

    // Criar agendamentos para pacientes com médicos
    for (let i = 0; i < 28; i++) {
        const patient = await prisma.user.findFirst({ where: { role: { has: 'PATIENT' } } });

        if (patient) {
            const doctor = doctors[Math.floor(Math.random() * doctors.length)];
            const service = services[Math.floor(Math.random() * services.length)];

            await prisma.appointment.create({
                data: {
                    userId: patient.id,
                    employeeId: doctor.id,
                    serviceId: service.id,
                    date: faker.date.soon({ days: 30 }),
                    status: faker.helpers.arrayElement(['PENDING', 'CONFIRMED']),
                },
            });

            console.log(
                `Consulta criada: Paciente ${patient.id} com Médico ${doctor.id} para o serviço ${service.name}`
            );
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