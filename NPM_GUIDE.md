# Guía de Publicación y Actualización en NPM 🚀

Esta guía detalla los pasos para publicar por primera vez y realizar actualizaciones del paquete `faniaticos-vibe` en NPM.

## 1. Preparación Previa

Antes de publicar, asegúrate de tener una cuenta en [npmjs.com](https://www.npmjs.com/).

### Iniciar sesión en la terminal
Ejecuta el siguiente comando e introduce tus credenciales:
```bash
npm login
```

### Verificación del Shebang (index.js)
El archivo principal (`index.js`) ya incluye la línea necesaria al principio:
```javascript
#!/usr/bin/env node
```
Esto permite que el script se ejecute como un ejecutable del sistema. Además, se han añadido los flags `--version` y `--help` para mejorar la experiencia de usuario.

## 2. Publicación por Primera Vez

Una vez configurado tu `package.json` (que ya tiene los campos `bin`, `name` y `version`), ejecuta:

```bash
npm publish --access public
```
> **Nota**: El flag `--access public` es necesario si el nombre de tu paquete comienza con un scope (ej: `@tu-usuario/nombre`). Si es un nombre libre, `npm publish` bastará.

## 3. Cómo hacer Actualizaciones

NPM no permite subir cambios con la misma versión. Debes seguir estos pasos:

### Paso A: Incrementar la versión
Usa el estándar de [Versionado Semántico (SemVer)](https://semver.org/lang/es/):
- **Patch (Parche)**: `1.0.1` (Errores menores)
  ```bash
  npm version patch
  ```
- **Minor (Menor)**: `1.1.0` (Nuevas funciones que no rompen nada)
  ```bash
  npm version minor
  ```
- **Major (Mayor)**: `2.0.0` (Cambios grandes o que rompen compatibilidad)
  ```bash
  npm version major
  ```

### Paso B: Publicar los cambios
Después de cambiar la versión, simplemente ejecuta:
```bash
npm publish
```

## 4. Consejos Importantes

- **Probar Localmente**: Antes de publicar, puedes probar cómo se instalaría tu paquete ejecutando:
  ```bash
  npm link
  ```
  Ahora puedes usar el comando `faniaticos-vibe` en cualquier lugar de tu máquina. Para quitarlo: `npm unlink`.
- **Files**: El `package.json` ya está configurado para incluir los archivos necesarios, pero asegúrate de que `index.js` y `stacks.js` estén siempre presentes.
- **README**: NPM mostrará automáticamente el contenido de tu `README.md` como página principal del paquete. ¡Mantenlo actualizado!
