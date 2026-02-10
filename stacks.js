export const STACKS = {
    wordpress: {
        label: "WordPress (Skills + Rules)",
        downloads: [
            // WordPress Skills from Automattic
            { src: "Automattic/agent-skills/skills", dest: ".agent/skills" },
            // WordPress Rules from central repo
            { src: "anlobarri/faniaticos-vibe-resources/wordpress/.agent/rules", dest: ".agent/rules" }
        ]
    },
    nextjs: {
        label: "Next.js (React Best Practices + Design)",
        downloads: [
            // Vercel Labs: React Best Practices
            { src: "vercel-labs/agent-skills/skills/react-best-practices", dest: ".agent/skills/react-best-practices/skills" },
            // Vercel Labs: Rules
            { src: "vercel-labs/agent-skills/rules", dest: ".agent/skills/react-best-practices/rules" },
            // Anthropics: Frontend Design
            { src: "anthropics/skills/skills/frontend-design", dest: ".agent/skills/frontend-design" }
        ]
    }
};
