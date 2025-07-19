import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    // Seed Roles
    await prisma.role.createMany({
        data: [
            { name: 'Employer' },
            { name: 'Candidate' },
        ],
        skipDuplicates: true,
    });

    // Seed Age Groups
    await prisma.ageGroup.createMany({
        data: [
            { name: '18-24' },
            { name: '25-34' },
            { name: '35-44' },
            { name: '45-54' },
        ],
        skipDuplicates: true,
    });

    // Seed Job Titles
    await prisma.jobTitles.createMany({
        data: [
            { title: "Construction Worker" },
            { title: "Cleaner" },
            { title: "Housekeeper" },
            { title: "Delivery Driver" },
            { title: "Warehouse Worker" },
            { title: "Security Guard" },
            { title: "Electrician" },
            { title: "Plumber" },
            { title: "Mechanic" },
            { title: "Carpenter" },
            { title: "Painter" },
            { title: "Mason" },
            { title: "Tailor" },
            { title: "Receptionist" },
            { title: "Sales Assistant" },
            { title: "Cashier" },
            { title: "Customer Service Representative" },
            { title: "Call Center Agent" },
            { title: "Teacher" },
            { title: "Nurse" },
            { title: "Doctor" },
            { title: "Software Engineer" },
            { title: "Data Analyst" },
            { title: "Graphic Designer" },
            { title: "Web Developer" },
            { title: "Mobile App Developer" },
            { title: "UI/UX Designer" },
            { title: "Digital Marketer" },
            { title: "Content Writer" },
            { title: "Photographer" },
            { title: "Accountant" },
            { title: "Administrative Assistant" },
            { title: "HR Manager" },
            { title: "Project Manager" },
            { title: "Business Analyst" },
            { title: "Financial Analyst" },
            { title: "Pharmacist" },
            { title: "Lab Technician" },
            { title: "Civil Engineer" },
            { title: "Mechanical Engineer" },
            { title: "Electrical Engineer" },
            { title: "Chemical Engineer" },
            { title: "Biomedical Engineer" },
            { title: "Chef" },
            { title: "Waiter" },
            { title: "Barista" },
            { title: "Hotel Manager" },
            { title: "Flight Attendant" },
            { title: "Pilot" },
            { title: "Lawyer" },
            { title: "Police Officer" },
            { title: "Firefighter" },
            { title: "Software Tester" },
            { title: "DevOps Engineer" },
            { title: "System Administrator" },
            { title: "Network Engineer" }
        ],
        skipDuplicates: true,
    });

    // Seed Regions
    await prisma.regions.createMany({
        data: [
            { name: "Ampara" },
            { name: "Anuradhapura" },
            { name: "Badulla" },
            { name: "Batticaloa" },
            { name: "Colombo" },
            { name: "Galle" },
            { name: "Gampaha" },
            { name: "Hambantota" },
            { name: "Jaffna" },
            { name: "Kalutara" },
            { name: "Kandy" },
            { name: "Kegalle" },
            { name: "Kilinochchi" },
            { name: "Kurunegala" },
            { name: "Mannar" },
            { name: "Matale" },
            { name: "Matara" },
            { name: "Monaragala" },
            { name: "Mullaitivu" },
            { name: "Nuwara Eliya" },
            { name: "Polonnaruwa" },
            { name: "Puttalam" },
            { name: "Ratnapura" },
            { name: "Trincomalee" },
            { name: "Vavuniya" }
        ],
        skipDuplicates: true,
    });

    console.log('✅ Seed data inserted');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
