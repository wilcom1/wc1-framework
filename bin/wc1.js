#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];
const projectName = args[1];

if (command === 'init') {
  if (!projectName) {
    console.error('Error: Debes especificar el nombre del proyecto');
    console.error('Uso: wc1 init <nombre-proyecto>');
    process.exit(1);
  }

  const targetDir = path.join(process.cwd(), projectName);
  const templateDir = path.join(__dirname, '..', 'templates', 'base');

  if (fs.existsSync(targetDir)) {
    console.error(`Error: La carpeta "${projectName}" ya existe`);
    process.exit(1);
  }

  if (!fs.existsSync(templateDir)) {
    console.error('Error: No se encontró la plantilla base');
    process.exit(1);
  }

  fs.mkdirSync(targetDir, { recursive: true });

  function copyDir(src, dest) {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  copyDir(templateDir, targetDir);
  console.log(`Proyecto "${projectName}" creado exitosamente`);
  console.log(`\nSiguientes pasos:`);
  console.log(`  cd ${projectName}`);
  console.log(`  opencode`);
} else {
  console.error(`Comando desconocido: ${command}`);
  console.error('Uso: wc1 init <nombre-proyecto>');
  process.exit(1);
}