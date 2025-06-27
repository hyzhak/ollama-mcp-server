#!/usr/bin/env node
// Modern MCP Server API for Ollama MCP (stdio transport only, HTTP/SSE planned for future)
//
// Future: Add HTTP/SSE transports for remote multi-client access (see memory bank).
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Ollama } from "ollama";
import { z } from "zod";

// Default Ollama API endpoint
const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
const ollama = new Ollama({ host: OLLAMA_HOST });

// Helper for error formatting
const formatError = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

const server = new McpServer({
  name: "ollama-mcp",
  version: "0.2.0",
});

// Tool: List models
server.registerTool(
  "list",
  {
    title: "List models",
    description: "List all models in Ollama",
    inputSchema: {},
  },
  async () => {
    try {
      const result = await ollama.list();
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${formatError(error)}` }], isError: true };
    }
  }
);

// Tool: Show model info
server.registerTool(
  "show",
  {
    title: "Show model info",
    description: "Show information for a model",
    inputSchema: { name: z.string() },
  },
  async ({ name }) => {
    try {
      const result = await ollama.show({ model: name });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${formatError(error)}` }], isError: true };
    }
  }
);

// Tool: Create model (remote only supports 'from')
server.registerTool(
  "create",
  {
    title: "Create model (remote only supports 'from')",
    description: "Create a model from a base model (remote only, no Modelfile support)",
    inputSchema: { name: z.string(), from: z.string() },
  },
  async ({ name, from }) => {
    try {
      const result = await ollama.create({ model: name, from });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${formatError(error)}` }], isError: true };
    }
  }
);

// Tool: Pull model
server.registerTool(
  "pull",
  {
    title: "Pull model",
    description: "Pull a model from a registry",
    inputSchema: { name: z.string() },
  },
  async ({ name }) => {
    try {
      const result = await ollama.pull({ model: name });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${formatError(error)}` }], isError: true };
    }
  }
);

// Tool: Push model
server.registerTool(
  "push",
  {
    title: "Push model",
    description: "Push a model to a registry",
    inputSchema: { name: z.string() },
  },
  async ({ name }) => {
    try {
      const result = await ollama.push({ model: name });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${formatError(error)}` }], isError: true };
    }
  }
);

// Tool: Copy model
server.registerTool(
  "cp",
  {
    title: "Copy model",
    description: "Copy a model",
    inputSchema: { source: z.string(), destination: z.string() },
  },
  async ({ source, destination }) => {
    try {
      const result = await ollama.copy({ source, destination });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${formatError(error)}` }], isError: true };
    }
  }
);

// Tool: Remove model
server.registerTool(
  "rm",
  {
    title: "Remove model",
    description: "Remove a model",
    inputSchema: { name: z.string() },
  },
  async ({ name }) => {
    try {
      const result = await ollama.delete({ model: name });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${formatError(error)}` }], isError: true };
    }
  }
);

// Tool: Run model (streamed)
server.registerTool(
  "run",
  {
    title: "Run model",
    description: "Run a model with a prompt (streamed)",
    inputSchema: { name: z.string(), prompt: z.string(), timeout: z.number().optional() },
  },
  async ({ name, prompt, timeout }) => {
    try {
      const ollamaStream = await ollama.generate({
        model: name,
        prompt,
        stream: true,
        options: {},
      });

      let text = "";
      for await (const chunk of ollamaStream) {
        if (chunk.response) {
          text += chunk.response;
        }
      }

      return { content: [{ type: "text", text }] };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${formatError(error)}` }], isError: true };
    }
  }
);

// Tool: Chat completion (OpenAI-compatible)
server.registerTool(
  "chat_completion",
  {
    title: "Chat completion",
    description: "OpenAI-compatible chat completion API",
    inputSchema: {
      model: z.string(),
      messages: z.array(z.object({
        role: z.enum(["system", "user", "assistant"]),
        content: z.string(),
      })),
      temperature: z.number().min(0).max(2).optional(),
      timeout: z.number().min(1000).optional(),
    },
  },
  async ({ model, messages, temperature, timeout }) => {
    try {
      const response = await ollama.chat({
        model,
        messages,
        options: { temperature },
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              id: "chatcmpl-" + Date.now(),
              object: "chat.completion",
              created: Math.floor(Date.now() / 1000),
              model,
              choices: [
                {
                  index: 0,
                  message: response.message,
                  finish_reason: "stop",
                },
              ],
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      return { content: [{ type: "text", text: `Error: ${formatError(error)}` }], isError: true };
    }
  }
);

// Start stdio transport (future: add HTTP/SSE)
const transport = new StdioServerTransport();
await server.connect(transport);
