import { prisma } from '@/lib/prisma';

async function verifyImport() {
  const productCount = await prisma.product.count();
  const categoryCount = await prisma.category.count();
  
  console.log(`📊 Products in database: ${productCount}`);
  console.log(`📊 Categories in database: ${categoryCount}`);
  
  const products = await prisma.product.findMany({
    take: 5,
    include: {
      category: true,
      images: true
    }
  });
  
  console.log('Sample products:');
  products.forEach(product => {
    console.log(`- ${product.name} (KES ${(product.price / 100).toFixed(2)}) - ${product.category?.name}`);
  });

  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: {
      children: true,
      _count: {
        select: { products: true }
      }
    }
  });

  console.log('\nCategories with product counts:');
  categories.forEach(category => {
    console.log(`- ${category.name}: ${category._count.products} products`);
    if (category.children.length > 0) {
      category.children.forEach(child => {
        console.log(`  → ${child.name}`);
      });
    }
  });
}

verifyImport()
  .catch(console.error)
  .finally(() => prisma.$disconnect());