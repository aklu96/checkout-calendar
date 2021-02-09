let i = 100000;
do {
  i -= 1;

  if (i % 10000 === 0) {
    console.log(`${100000 - i} records have been seeded...`);
  }
} while (i > 0);
