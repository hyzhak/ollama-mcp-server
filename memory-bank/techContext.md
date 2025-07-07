# Tech Context

## Technologies Used

- **Node.js**: Runtime environment.
- **TypeScript**: Main language, strict mode enabled.
- **@modelcontextprotocol/sdk**: MCP server SDK for tool and transport management (v1.13.0+).
- **ollama-js**: Library for interacting with the Ollama API.
- **Zod**: Runtime and static validation of tool arguments.

## Development Setup

- **Install**: `npm install` to install dependencies.
- **Build**: `npm run build` to compile TypeScript to `build/`.
- **Watch**: `npm run watch` for live TypeScript compilation.
- **CLI**: Entry point is `build/index.js`, exposed as `ollama-mcp-server`.
- **Inspector**: `npx @modelcontextprotocol/inspector build/index.js` for MCP tool inspection.

## Technical Constraints

- Requires Ollama installed and accessible via API.
- MCP server must be started via Node.js (stdio transport currently; HTTP/SSE planned).
- Ollama API endpoint configurable via `OLLAMA_HOST` environment variable.

## Dependencies

- **Production**:
  - `@modelcontextprotocol/sdk` (v1.13.0)
  - `ollama` (v0.5.16)
  - `zod`
- **Development**:
  - `typescript`
  - `@types/node`

## Tool Usage Patterns

- MCP tools are registered using `registerTool` with Zod-validated schemas.
- Each tool handler calls the Ollama API via `ollama-js`.
- Errors are caught and formatted for MCP compatibility.
- Streaming output is buffered and returned as a single text response.
