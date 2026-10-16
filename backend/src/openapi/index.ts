import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openApiSpec } from './spec.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function exportOpenApiJson() {
  const outputPath = path.resolve(__dirname, '../../../docs/openapi.json');
  fs.writeFileSync(outputPath, JSON.stringify(openApiSpec, null, 2), 'utf-8');
  console.log(`📄 Exported OpenAPI contract to ${outputPath}`);
}

export { openApiSpec };
