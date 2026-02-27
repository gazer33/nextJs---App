// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data (in development)
  await prisma.task.deleteMany()
  await prisma.project.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  console.log('  ✓ Cleared existing data')

  // Create demo user
  // Note: This is a placeholder password hash - will be replaced with real bcrypt in Slice 3
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      passwordHash: 'PLACEHOLDER_HASH_WILL_BE_REPLACED_IN_SLICE_3',
      name: 'Demo User',
    },
  })

  console.log('  ✓ Created demo user:', demoUser.email)

  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Website Redesign',
      description: 'Complete overhaul of company website with modern design',
      status: 'ACTIVE',
      userId: demoUser.id,
    },
  })

  const project2 = await prisma.project.create({
    data: {
      name: 'Mobile App Development',
      description: 'Build native iOS and Android applications',
      status: 'PLANNING',
      userId: demoUser.id,
    },
  })

  const project3 = await prisma.project.create({
    data: {
      name: 'Marketing Campaign Q1',
      description: 'First quarter marketing initiatives and social media strategy',
      status: 'COMPLETED',
      userId: demoUser.id,
    },
  })

  console.log('  ✓ Created 3 sample projects')

  // Create tasks for project 1
  await prisma.task.createMany({
    data: [
      {
        projectId: project1.id,
        title: 'Design homepage mockup',
        description: 'Create high-fidelity mockup in Figma',
        status: 'DONE',
        priority: 'HIGH',
      },
      {
        projectId: project1.id,
        title: 'Implement responsive navigation',
        description: 'Build mobile-first navigation component',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
      },
      {
        projectId: project1.id,
        title: 'Set up CI/CD pipeline',
        description: 'Configure GitHub Actions for automated deployments',
        status: 'TODO',
        priority: 'MEDIUM',
      },
      {
        projectId: project1.id,
        title: 'Write technical documentation',
        description: 'Document API endpoints and component usage',
        status: 'TODO',
        priority: 'LOW',
        dueDate: new Date('2026-03-15'),
      },
    ],
  })

  // Create tasks for project 2
  await prisma.task.createMany({
    data: [
      {
        projectId: project2.id,
        title: 'Research native frameworks',
        description: 'Evaluate React Native vs Flutter vs native development',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
      },
      {
        projectId: project2.id,
        title: 'Design app wireframes',
        description: 'Create low-fidelity wireframes for all screens',
        status: 'TODO',
        priority: 'HIGH',
      },
      {
        projectId: project2.id,
        title: 'Set up development environment',
        description: 'Install Xcode, Android Studio, and dependencies',
        status: 'TODO',
        priority: 'MEDIUM',
      },
    ],
  })

  // Create tasks for project 3
  await prisma.task.createMany({
    data: [
      {
        projectId: project3.id,
        title: 'Launch social media campaign',
        description: 'Execute planned posts across all platforms',
        status: 'DONE',
        priority: 'HIGH',
      },
      {
        projectId: project3.id,
        title: 'Analyze campaign metrics',
        description: 'Review engagement and conversion data',
        status: 'DONE',
        priority: 'MEDIUM',
      },
      {
        projectId: project3.id,
        title: 'Prepare Q2 strategy',
        description: 'Build on Q1 learnings for next quarter',
        status: 'DONE',
        priority: 'MEDIUM',
      },
    ],
  })

  console.log('  ✓ Created 10 sample tasks across all projects')

  // Summary
  const counts = {
    users: await prisma.user.count(),
    projects: await prisma.project.count(),
    tasks: await prisma.task.count(),
  }

  console.log('\n📊 Database seeded successfully!')
  console.log(`   Users: ${counts.users}`)
  console.log(`   Projects: ${counts.projects}`)
  console.log(`   Tasks: ${counts.tasks}`)
  console.log('\n💡 Demo credentials (for Slice 3):')
  console.log('   Email: demo@example.com')
  console.log('   Password: demo123 (will be set in Slice 3)\n')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
