import { prisma } from '@/lib/prisma';

const categories = [
  {
    name: "Surveillance & Security",
    slug: "surveillance",
    description: "Security cameras and surveillance systems",
    children: [
      { name: "Network Cameras (I.P Cameras)", slug: "network-cameras" },
      { name: "PTZ Cameras", slug: "ptz-cameras" },
      { name: "Dash Cameras", slug: "dash-cameras" },
      { name: "Network Recorders (NVR)", slug: "nvr" },
      { name: "Storage", slug: "storage" },
      { name: "Access Control", slug: "access-control" },
      { name: "Monitors", slug: "monitors" },
      { name: "IVS", slug: "ivs" },
      { name: "Mobile & Traffic", slug: "mobile-traffic" },
      { name: "Accessories", slug: "accessories" },
    ]
  },
  {
    name: "Anti-Theft Systems",
    slug: "anti-theft",
    description: "Anti-theft security systems",
    children: []
  },
  {
    name: "Fire",
    slug: "fire",
    description: "Fire safety equipment",
    children: [
      { name: "Accessories", slug: "fire-accessories" },
      { name: "Break Glass", slug: "break-glass" },
      { name: "Control Panels", slug: "control-panels" },
      { name: "Detectors", slug: "detectors" },
      { name: "Sounders", slug: "sounders" },
    ]
  },
  {
    name: "Network",
    slug: "network",
    description: "Networking equipment",
    children: [
      { name: "Wireless Routers", slug: "wireless-routers" },
      { name: "Switches", slug: "switches" },
    ]
  },
  {
    name: "Intercom",
    slug: "intercom",
    description: "Intercom systems",
    children: []
  }
];

async function seedCategories() {
  console.log('Starting category seeding...');

  try {
    for (const categoryData of categories) {
      // Create or update parent category
      const category = await prisma.category.upsert({
        where: { slug: categoryData.slug },
        update: {
          name: categoryData.name,
        },
        create: {
          name: categoryData.name,
          slug: categoryData.slug,
        }
      });

      console.log(`✅ ${category.name} category processed`);

      // Create or update child categories
      for (const childData of categoryData.children) {
        await prisma.category.upsert({
          where: { slug: childData.slug },
          update: {
            name: childData.name,
            parentId: category.id
          },
          create: {
            name: childData.name,
            slug: childData.slug,
            parentId: category.id
          }
        });
        console.log(`   → ${childData.name} subcategory processed`);
      }
    }

    console.log('✅ All categories seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    throw error;
  }
}

// Run the seeding
seedCategories()
  .catch((error) => {
    console.error('Failed to seed categories:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
