"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLLMResponse = parseLLMResponse;
function parseLLMResponse(llmText) {
    const lines = llmText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
    const title = lines[0];
    let tags = [];
    let priority = "medium";
    lines.slice(1).forEach((line) => {
        if (line.toLowerCase().startsWith("tags:")) {
            tags = line
                .replace(/^tags:/i, "")
                .split(",")
                .map((tag) => tag.trim());
        }
        if (line.toLowerCase().startsWith("priority:")) {
            priority = line
                .replace(/^priority:/i, "")
                .trim()
                .toLowerCase();
        }
    });
    return { title, tags, priority };
}
//# sourceMappingURL=parseTodo.js.map