export const STACKS = {
    wordpress: {
        label: "WordPress (Skills + Rules)",
        downloads: [
            { src: "Automattic/agent-skills/skills", dest: ".agent/skills" },
            { src: "anlobarri/faniaticos-vibe-resources/wordpress/.agent/rules", dest: ".agent/rules" }
        ]
    },
    nextjs: {
        label: "Next.js (React Best Practices + Design)",
        downloads: [
            { src: "vercel-labs/agent-skills/skills/react-best-practices", dest: ".agent/skills/react-best-practices/skills" },
            { src: "anlobarri/faniaticos-vibe-resources/nextjs/.agent/rules", dest: ".agent/rules" },
            { src: "anthropics/skills/skills/frontend-design", dest: ".agent/skills/frontend-design" }
        ],
        optionals: [
            {
                id: "copywriting",
                message: "✍️  ¿Quieres integrar habilidades de copywriting para tu web?",
                downloads: [
                    { src: "coreyhaines31/marketingskills/skills", dest: ".agent/skills/copywriting" }
                ]
            }
        ]
    },
    n8n: {
        label: "n8n (Automation Skills)",
        downloads: [
            { src: "czlonkowski/n8n-skills/skills", dest: ".agent/skills" }
        ]
    }
};
