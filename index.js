#!/usr/bin/env node

process.removeAllListeners('warning');

import { input, select, Separator, confirm } from "@inquirer/prompts";
import degit from "degit";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { STACKS } from "./stacks.js";

// ─── Helpers ───────────────────────────────────────────────────────────────────
function banner() {
    return new Promise((resolve, reject) => {
        figlet.text("Faniaticos Vibe", { font: "ANSI Shadow" }, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function printBanner(text) {
    const purpleGradient = gradient(["#7B2FBE", "#A855F7", "#D8B4FE"]);
    console.log("");
    console.log(purpleGradient.multiline(text));
    console.log("");
}

function logStep(message, type = "info") {
    const symbols = {
        info: chalk.hex("#A855F7")("◇"),
        active: chalk.hex("#7B2FBE")("●"),
        success: chalk.hex("#A855F7")("✔"),
        error: chalk.red("✖"),
        line: chalk.gray("│"),
    };

    if (type === "start") {
        console.log(chalk.gray("\n  ┌── Procesando ──┐"));
        return;
    }

    if (type === "end") {
        console.log(chalk.gray("  └────────────────┘\n"));
        return;
    }

    console.log(`  ${symbols.line}`);
    if (type === "active") {
        console.log(`  ${symbols.active} ${chalk.white(message)}`);
    } else if (type === "success") {
        console.log(`  ${symbols.success} ${chalk.hex("#A855F7")(message)}`);
    } else if (type === "error") {
        console.log(`  ${symbols.error} ${chalk.red(message)}`);
    } else {
        console.log(`  ${symbols.info} ${chalk.gray(message)}`);
    }
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
    try {
        // 1. Show banner
        const bannerText = await banner();
        printBanner(bannerText);

        // 2. Ask for stack
        const stack = await select({
            message: chalk.cyan("🛠️  ¿En qué quieres trabajar hoy?"),
            theme: { prefix: chalk.hex("#A855F7")("✔ ") },
            choices: [
                { name: "🌐 WordPress", value: "wordpress" },
                { name: "⚛️  Next.js (React Best Practices)", value: "nextjs" },
                new Separator(),
                { name: chalk.gray("🔜 Más stacks próximamente..."), value: null, disabled: true },
            ],
        });

        // 4. Ask for git initialization
        const initGit = await confirm({
            message: chalk.cyan("🔧 ¿Quieres inicializar un repositorio git?"),
            theme: { prefix: chalk.hex("#A855F7")("✔ ") },
            default: true,
        });

        if (!stack) {
            console.log(chalk.yellow("\n⚠️ Ningún stack seleccionado. Saliendo...\n"));
            process.exit(0);
        }

        const stackConfig = JSON.parse(JSON.stringify(STACKS[stack])); // Deep clone to avoid mutating original config
        if (!stackConfig) {
            console.log(chalk.red("\n❌ Stack no encontrado.\n"));
            process.exit(1);
        }

        // Process Optional Features from Config
        if (stackConfig.optionals && Array.isArray(stackConfig.optionals)) {
            for (const opt of stackConfig.optionals) {
                const addOptional = await confirm({
                    message: chalk.cyan(opt.message),
                    theme: { prefix: chalk.hex("#A855F7")("✔ ") },
                    default: false,
                });

                if (addOptional && opt.downloads) {
                    stackConfig.downloads.push(...opt.downloads);
                }
            }
        }

        const projectPath = process.cwd();
        const folderName = path.basename(projectPath);

        // 5. Execution Flow
        logStep(null, "start");

        logStep(`Inicializando entorno en ${chalk.white(folderName)}...`);

        logStep("Generando archivo .gitignore...");
        const gitignorePath = path.join(projectPath, ".gitignore");
        const gitignoreContent = ".agent/skills/\nnode_modules/\n";
        fs.writeFileSync(gitignorePath, gitignoreContent);

        if (initGit) {
            logStep("Inicializando repositorio git...");
            try {
                execSync("git init", { cwd: projectPath, stdio: "ignore" });
                logStep("Git inicializado correctamente.", "success");
            } catch (gitError) {
                logStep(`Error git: ${gitError.message}`, "error");
            }
        }

        // Process downloads
        logStep(`Descargando recursos para ${chalk.white.bold(stackConfig.label)}...`, "active");

        for (const resource of stackConfig.downloads) {
            const resourceDest = path.join(projectPath, resource.dest);
            const resourceName = resource.src.split("/").pop();
            logStep(`Descargando ${chalk.cyan(resourceName)}...`, "info");

            try {
                fs.mkdirSync(resourceDest, { recursive: true });
                const emitter = degit(resource.src, {
                    cache: false,
                    force: true,
                    verbose: false,
                });

                await emitter.clone(resourceDest);
                logStep(`  ${resourceName} ✔`, "success");
            } catch (err) {
                logStep(`Error descargando ${resourceName}: ${err.message}`, "error");
            }
        }

        logStep("Todos los recursos sincronizados.", "success");

        logStep(null, "end");

        // 6. Success summary
        console.log(chalk.gray("─".repeat(60)));
        const successTitle = gradient(["#7B2FBE", "#D8B4FE"])("  🎉 ¡PROYECTO LISTO!");
        console.log(`\n${successTitle}\n`);

        console.log(chalk.white("   Ubicación:"));
        console.log(chalk.cyan(`   ${projectPath}\n`));

        console.log(chalk.gray("─".repeat(60)));
        console.log(
            chalk.hex("#7B2FBE").bold("   ✨ Happy Vibe Coding! — Faniaticos.club\n")
        );
    } catch (error) {
        if (error.isTtyError) {
            console.log(chalk.red("\n❌ Este terminal no soporta la interfaz interactiva.\n"));
        } else if (error.message?.includes("User force closed") || error.name === "ExitPromptError") {
            console.log(chalk.yellow("\n👋 ¡Hasta luego!\n"));
        } else {
            console.log(chalk.red(`\n❌ Error: ${error.message}\n`));
        }
        process.exit(1);
    }
}

main();
