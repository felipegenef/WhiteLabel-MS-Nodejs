import * as fs from "fs";
import * as path from "path";

async function generateMigration(name: string): Promise<void> {
  const timestamp = Date.now();
  const fileName = `${timestamp}-${name}.ts`;
  const content = `// Migration generated at ${new Date(
    timestamp
  ).toISOString()}\n\nimport { MigrationInterface, QueryRunner, Table } from "typeorm";

  export class ${
    name.replace(/-/g, "_") + timestamp
  } implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await Promise.all([]);
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await Promise.all([]);
    }
  }
  `;

  fs.writeFileSync(path.join("./migrations", fileName), content);
  console.log(`Migration ${fileName} created.`);
  process.exit();
}

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error("Usage: node script.ts [--generate <name>]");
  process.exit(1);
}

const generateNameIndex = args.indexOf("--generate");

const generateName = args[generateNameIndex + 1];
generateMigration(generateName).catch((error) => {
  console.error("Error generating migration:", error);
});
