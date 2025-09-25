export function parseLLMResponse(llmText: string): {
  title: string;
  tags: string[];
  priority: string;
} {
  const lines = llmText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const title = lines[0];
  let tags: string[] = [];
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
