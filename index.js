#!/usr/bin/env node

import { input, select, Separator, confirm } from "@inquirer/prompts";
import degit from "degit";
import chalk from "chalk";
import figlet from "figlet";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// ─── Config ────────────────────────────────────────────────────────────────────
const STACKS = {
    wordpress: {
        label: "WordPress",
        repo: "Automattic/agent-skills/skills",
    },
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
function banner() {
    return new Promise((resolve, reject) => {
        figlet.text("Faniaticos Vibe", { font: "Standard" }, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function printBanner(text) {
    console.log("");
    console.log(chalk.hex("#7B2FBE").bold(text));
    console.log(
        chalk.gray("─".repeat(60))
    );
    console.log(
        chalk.hex("#A855F7")(
            "  🚀 Vibe Coding Project Manager"
        )
    );
    console.log(chalk.gray("─".repeat(60)));
    console.log("");
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
    try {
        // 1. Show banner
        const bannerText = await banner();
        printBanner(bannerText);

        // 2. Ask for project name
        const projectName = await input({
            message: chalk.cyan("📁 ¿Cómo se llama tu proyecto?"),
            validate: (input) => {
                if (!input.trim()) return "El nombre del proyecto no puede estar vacío.";
                if (/[<>:"/\\|?*]/.test(input)) return "El nombre contiene caracteres no válidos.";
                return true;
            },
        });

        const stack = await select({
            message: chalk.cyan("🛠️  ¿En qué quieres trabajar hoy?"),
            choices: [
                { name: "🌐 WordPress", value: "wordpress" },
                new Separator(),
                { name: chalk.gray("🔜 Más stacks próximamente..."), value: null, disabled: true },
            ],
        });

        // 4. Ask for git initialization
        const initGit = await confirm({
            message: chalk.cyan("🔧 ¿Quieres inicializar un repositorio git?"),
            default: true,
        });

        if (!stack) {
            console.log(chalk.yellow("\n⚠️ Ningún stack seleccionado. Saliendo...\n"));
            process.exit(0);
        }

        const stackConfig = STACKS[stack];
        if (!stackConfig) {
            console.log(chalk.red("\n❌ Stack no encontrado.\n"));
            process.exit(1);
        }

        const sanitizedName = projectName.trim().replace(/\s+/g, "-").toLowerCase();
        const projectPath = path.resolve(process.cwd(), sanitizedName);
        const skillsPath = path.join(projectPath, ".agent", "skills");

        // 4. Create project folder structure
        console.log("");
        console.log(chalk.yellow("📂 Creando estructura del proyecto..."));
        fs.mkdirSync(skillsPath, { recursive: true });
        console.log(chalk.green(`   ✔ Carpeta creada: ${chalk.white(projectPath)}`));

        // Create .gitignore
        const gitignorePath = path.join(projectPath, ".gitignore");
        const gitignoreContent = ".agent/skills/\nnode_modules/\n";
        fs.writeFileSync(gitignorePath, gitignoreContent);
        console.log(chalk.green("   ✔ Archivo .gitignore creado."));

        // 5. Download skills with degit
        console.log(chalk.yellow("\n⬇️  Descargando skills desde ") + chalk.white.bold(stackConfig.label) + chalk.yellow("..."));

        const emitter = degit(stackConfig.repo, {
            cache: false,
            force: true,
            verbose: false,
        });

        await emitter.clone(skillsPath);
        console.log(chalk.green("   ✔ Skills descargadas correctamente.\n"));

        // 6. Initialize Git if requested
        if (initGit) {
            console.log(chalk.yellow("🔧 Inicializando repositorio git..."));
            try {
                execSync("git init", { cwd: projectPath, stdio: "ignore" });
                console.log(chalk.green("   ✔ Repositorio git inicializado.\n"));
            } catch (gitError) {
                console.log(chalk.red(`   ⚠️ No se pudo inicializar git: ${gitError.message}\n`));
            }
        }

        // 6. Success summary
        console.log(chalk.gray("─".repeat(60)));
        console.log(chalk.hex("#7B2FBE").bold("\n🎉 ¡Proyecto listo!\n"));
        console.log(chalk.white("   Skills instaladas en:"));
        console.log(chalk.cyan(`   ${skillsPath}\n`));

        console.log(chalk.white("   Para empezar:"));
        console.log(chalk.green(`   $ cd ${sanitizedName}`));
        console.log(chalk.green("   $ code .\n"));

        console.log(chalk.gray("─".repeat(60)));
        console.log(
            chalk.hex("#A855F7")("   ✨ Happy Vibe Coding! — Faniaticos.club\n")
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
