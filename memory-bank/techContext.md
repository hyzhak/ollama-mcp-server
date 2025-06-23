# Tech Context

## Technologies Used
- **Node.js**: Runtime environment.
- **TypeScript**: Main language, strict mode enabled.
- **@modelcontextprotocol/sdk**: MCP server SDK for tool and transport management.
- **axios**: HTTP client for Ollama API requests.

## Development Setup
- **Build**: `pnpm install` to install dependencies, `pnpm run build` to compile TypeScript to `build/`.
- **Watch**: `pnpm run watch` for live TypeScript compilation.
- **CLI**: Entry point is `build/index.js`, exposed as `ollama-mcp`.
- **Inspector**: `npx @modelcontextprotocol/inspector build/index.js` for MCP tool inspection.

## Technical Constraints
- Requires Ollama installed and accessible via CLI and/or API.
- MCP server must be started via Node.js (stdio or HTTP/SSE).
- Ollama API endpoint configurable via `OLLAMA_HOST` environment variable.

## Dependencies
- **Production**:
  - `@modelcontextprotocol/sdk` (v0.6.0)
  - `axios` (v1.7.9)
- **Development**:
  - `typescript` (v5.3.3)
  - `@types/node` (v20.11.24)

## Tool Usage Patterns
- MCP tools mapped to Ollama CLI/API operations.
- Error handling and streaming supported natively.
- Supports both synchronous and streaming (SSE) responses.
