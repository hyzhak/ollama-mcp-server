# System Patterns

## Architecture Overview
- **Class-based server**: Main logic encapsulated in `OllamaServer` class.
- **MCP Server**: Uses `@modelcontextprotocol/sdk` to expose Ollama as an MCP server.
- **Transport Support**: Supports both stdio and SSE (HTTP) transports for flexibility.
- **Tool-based API**: Each Ollama operation is exposed as a distinct MCP tool.

## Key Technical Decisions
- **Tool Handler Pattern**: Each tool (serve, create, show, run, pull, push, list, cp, rm, chat_completion) is mapped to a handler method.
- **Error Handling**: Centralized error formatting and MCP error propagation.
- **Streaming Support**: Uses SSE and transform streams for model output streaming.
- **Configurable Endpoint**: Ollama API endpoint is configurable via environment variable.

## Component Relationships
- `OllamaServer` manages tool registration and request handling.
- Tool handlers translate MCP requests to Ollama CLI/API calls.
- Uses `axios` for HTTP requests to Ollama API.
- Uses Node.js `child_process` for CLI commands.

## Critical Implementation Paths
- MCP request → tool handler → Ollama CLI/API → result mapped to MCP response.
- Chat completion tool adapts OpenAI-style messages to Ollama prompt format.
- Server startup initializes both stdio and HTTP (SSE) endpoints.
