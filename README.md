# WC1 Framework

Framework base para proyectos desarrollados con opencode.

## Estructura

```
wc1.framework/
├── bin/
│   └── wc1.js             # CLI para wc1 init
├── opencode.json          # Configuración base de opencode
├── AGENTS.md              # Instrucciones generales
├── .opencode/             # Configuración de opencode
│   ├── agents/            # Agentes personalizados
│   ├── commands/          # Comandos reutilizables
│   ├── skills/            # Skills especializados
│   └── plugins/           # Plugins
└── templates/             # Plantillas para nuevos proyectos
    └── base/              # Plantilla base reutilizable
```

## Uso

### Instalación global
```bash
npm install -g wc1-framework
```

### Crear nuevo proyecto
```bash
wc1 init <nombre-proyecto>
cd <nombre-proyecto>
opencode
```

### Sin instalar globalmente
```bash
npx wc1-framework init <nombre-proyecto>
cd <nombre-proyecto>
opencode
```

### Ejemplo
```bash
wc1 init mi-app
cd mi-app
opencode
```

### Personalizar
- Editar `opencode.json` para configuración específica del proyecto
- Agregar agentes en `.opencode/agents/`
- Crear comandos personalizados en `.opencode/commands/`
- Desarrollar skills en `.opencode/skills/`

## Configuración

El archivo `opencode.json` define:
- Instrucciones base para todos los proyectos
- Permisos por defecto para herramientas comunes
- Esquema de validación

## Convenciones

- Usar commits convencionales: feat:, fix:, docs:, refactor:, test:
- Mantener código limpio y documentado
- Escribir tests para nueva funcionalidad
- Seguir convenciones del lenguaje utilizado