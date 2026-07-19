#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function findPackageRoot() {
  let dir = __dirname;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return __dirname;
}

function getVersion() {
  const packageRoot = findPackageRoot();
  const packageJson = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));
  return packageJson.version;
}

const args = process.argv.slice(2);
const command = args[0];

if (command === '-v' || command === '--version') {
  console.log(getVersion());
} else if (command === 'init') {
  const projectName = args[1];

  if (!projectName) {
    console.error('Error: Debes especificar el nombre del proyecto');
    console.error('Uso: wc1 init <nombre-proyecto>');
    process.exit(1);
  }

  const targetDir = path.join(process.cwd(), projectName);
  const packageRoot = findPackageRoot();
  const templateDir = path.join(packageRoot, 'templates', 'base');

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
  console.error('Uso:');
  console.error('  wc1 init <nombre-proyecto>  Crear nuevo proyecto');
  console.error('  wc1 -v                     Mostrar versión');
  process.exit(1);
}