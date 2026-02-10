# Faniaticos Vibe TUI 🚀

Faniaticos Vibe TUI es una herramienta de interfaz de línea de comandos (TUI) diseñada para automatizar la inicialización de proyectos de **Vibe Coding**. Permite configurar rápidamente entornos de desarrollo descargando habilidades (skills), reglas y plantillas optimizadas desde repositorios remotos.

## ✨ Características Principales

- **Selección de Stacks**: Elige entre diferentes entornos preconfigurados (WordPress, Next.js, n8n).
- **Descarga Automática**: Utiliza `degit` para descargar recursos específicos de GitHub de forma rápida y limpia.
- **Configuración de Agentes**: Descarga automáticamente habilidades (`.agent/skills`) y reglas (`.agent/rules`) para potenciar tu flujo de trabajo con IA.
- **CLI Versátil**: Incluye soporte para flags estándar como `--version` y `--help`.
- **Experiencia Premium**: Interfaz visual atractiva con banners estilo ASCII y colores vibrantes.

## 🛠️ Stacks Soportados

### 🌐 WordPress
Configuración optimizada para el ecosistema WordPress con skills de Automattic y reglas de Faniaticos Club.

### ⚛️ Next.js
Ideal para aplicaciones React modernas, incluyendo mejores prácticas de Vercel Labs y diseño de Anthropic.

### 🤖 Automatizaciones con n8n
Nuevo stack para flujos de trabajo automatizados, integrando skills especializadas para n8n.

## 🚀 Instalación y Uso

1. **Ejecución Directa (Recomendado):**
   ```bash
   npx faniaticos-vibe
   ```
   *No necesitas instalar nada. Se descarga, ejecuta y listo.*

2. **Instalación Global (Alternativa):**
   ```bash
   npm install -g faniaticos-vibe
   ```
   Después ejecuta:
   ```bash
   faniaticos-vibe
   ```

3. **Opciones de CLI:**
   - `faniaticos-vibe --help`: Muestra la ayuda.
   - `faniaticos-vibe --version`: Muestra la versión actual.

## 📁 Estructura del Proyecto

- `index.js`: Lógica principal y manejo de comandos.
- `stacks.js`: Configuración de fuentes y destinos para cada stack.
- `package.json`: Metadatos y dependencias del paquete.

## 🌟 Créditos

Desarrollado con ❤️ por **Faniaticos.club** para potenciar el Vibe Coding en todo el mundo.
