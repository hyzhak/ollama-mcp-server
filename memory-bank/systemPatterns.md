# System Patterns

## Architecture Overview

- **Functional MCP Server**: The main logic is implemented in a functional style using `McpServer` from `@modelcontextprotocol/sdk`.
- **Tool Registration**: Each Ollama operation (list, show, create, pull, push, cp, rm, run, chat_completion) is registered as an MCP tool using `registerTool`.
- **Input Validation**: Uses Zod schemas for runtime and static validation of tool arguments.
- **Transport Support**: Currently supports stdio transport for CLI/stdio integration. HTTP/SSE transport is planned for future releases.
- **Ollama Integration**: Uses `ollama-js` for all interactions with the Ollama API.

## Key Technical Decisions

- **registerTool Pattern**: All MCP tools are registered with explicit input schemas and async handler functions.
- **Type Safety**: Handlers are fully type-safe, leveraging TypeScript and Zod.
- **Error Handling**: Errors are caught and formatted for MCP compatibility.
- **Streaming Output**: Streaming output from Ollama is buffered and returned as a single text response for compatibility with MCP SDK expectations.

## Component Relationships

- `McpServer` manages tool registration and transport setup.
- Each tool handler translates MCP requests to Ollama API calls using `ollama-js`.
- Zod schemas define and validate the structure of tool arguments.

## Critical Implementation Paths

- MCP request → tool handler (via registerTool) → Ollama API (via ollama-js) → result mapped to MCP response.
- Chat completion tool adapts OpenAI-style messages to Ollama prompt format.
- Server startup initializes stdio transport; HTTP/SSE is a future enhancement.
