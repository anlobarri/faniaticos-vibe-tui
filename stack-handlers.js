import { input, select, confirm } from "@inquirer/prompts";
import chalk from "chalk";
import { execSync } from "child_process";
import path from "path";
import fs from "fs";

/**
 * Handles initialization for Next.js stack.
 * @param {Function} logStep - Function to log steps in the TUI.
 * @returns {Promise<{success: boolean, projectPath: string, folderName: string}>}
 */
export async function handleNextJsInit(logStep) {
    const createNewProject = await confirm({
        message: chalk.cyan("🚀 ¿Quieres ejecutar 'create-next-app' para iniciar el proyecto?"),
        theme: { prefix: chalk.hex("#A855F7")("✔ ") },
        default: true,
    });

    if (!createNewProject) {
        return { success: false };
    }

    const projectLocation = await select({
        message: chalk.cyan("📂 ¿Dónde quieres crear el proyecto?"),
        choices: [
            { name: "📁 En esta carpeta (directorio actual)", value: "current" },
            { name: "✨ En una nueva carpeta", value: "new" },
        ],
        theme: { prefix: chalk.hex("#A855F7")("✔ ") },
    });

    let appName = ".";
    let projectPath = process.cwd();
    let folderName = path.basename(projectPath);

    if (projectLocation === "new") {
        appName = await input({
            message: chalk.cyan("Nombre del proyecto:"),
            default: "my-vibe-app",
            theme: { prefix: chalk.hex("#A855F7")("✔ ") },
            validate: (value) => value.trim() !== "" || "El nombre no puede estar vacío",
        });
    }

    logStep("Ejecutando create-next-app@latest...", "active");
    try {
        // Execute create-next-app with stdio: 'inherit' to allow interaction
        execSync(`npx create-next-app@latest ${appName}`, {
            stdio: "inherit",
        });

        logStep("Proyecto Next.js creado exitosamente.", "success");

        if (projectLocation === "new") {
            // Update project path to the new directory
            projectPath = path.join(process.cwd(), appName);
            folderName = appName;

            // Change process working directory to the new project so subsequent commands run there
            try {
                process.chdir(projectPath);
            } catch (err) {
                logStep(`Error cambiando al directorio ${appName}: ${err.message}`, "error");
                process.exit(1);
            }
        }
        // If current, process.cwd() is already correct and doesn't need changing

        return { success: true, projectPath, folderName };
    } catch (error) {
        logStep("Error al ejecutar create-next-app. Verifica que tengas npx instalado y conexión a internet.", "error");
        process.exit(1);
    }
}
