# Active Context

## Current Work Focus

- Modernizing the MCP Ollama server to use the latest @modelcontextprotocol/sdk and ollama-js.
- Ensuring all core Ollama operations are registered as MCP tools using registerTool and Zod validation.
- Maintaining compatibility with MCP conventions and Ollama updates.

## Recent Changes

- Migrated from legacy MCP server API to the modern McpServer/registerTool pattern.
- Replaced class-based and CLI/axios architecture with functional handlers and ollama-js.
- All core Ollama operations mapped to MCP tools with type-safe handlers.
- Only stdio transport is currently implemented; HTTP/SSE is planned for future releases.
- Updated documentation and memory bank to reflect new architecture.
- Simplified "run" tool: removed streaming logic, now always returns full response after completion (no partial/streamed output in stdio mode).

## Recent Changes

- Added support for images in chat messages (`chat_completion` tool) for vision/multimodal models.
- Updated README with usage examples for chat with images.

## Next Steps

- Expand test coverage for all MCP tools, including chat with images.
- Monitor for changes in Ollama or MCP SDK APIs and update handlers as needed.
- Add HTTP/SSE transport for remote/multi-client access.
- Improve error reporting and diagnostics.
- Document advanced usage and troubleshooting.

### Release Flow

- Push changes and tags:  
  `git push origin main --follow-tags`

## Active Decisions and Considerations

- Using functional registerTool pattern for extensibility and clarity.
- Prioritizing full API coverage and OpenAI compatibility.
- Keeping configuration simple but flexible (env vars for endpoint, timeout, temperature).
- "run" tool now supports an optional temperature parameter directly in its arguments for deterministic or creative outputs.
- "run" tool does not support streaming in stdio MCP mode; response is accumulated and returned only after completion.
- Focusing on robust error handling and compatibility with MCP SDK.

## Important Patterns and Preferences

- Tool registration via registerTool with Zod schemas for validation.
- Functional handler pattern for mapping MCP tools to Ollama operations.
- Preference for explicit, well-documented interfaces.

## Learnings and Project Insights

- MCP tool abstraction enables rapid integration of new Ollama features.
- Streaming is not supported in stdio MCP transport; future HTTP/SSE support may enable true streaming.
- Clear documentation and memory bank are essential for maintainability.
- Modern MCP SDK and ollama-js simplify integration and improve type safety.

## Recommended Follow-ups

- All contributions must follow the Conventional Commits standard (see project cline rules).
- Integrate semantic-release to automate versioning and npm publishing based on commit messages.
- Enable CodeQL or Snyk for automated vulnerability scanning of dependencies and code.
- Activate GitHub Discussions to provide a space for community Q&A and support.
