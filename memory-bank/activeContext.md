# Active Context

## Current Work Focus
- Establishing and documenting the Memory Bank for the project.
- Ensuring all core MCP tools for Ollama are implemented and exposed.
- Maintaining compatibility with MCP conventions and Ollama updates.

## Recent Changes
- Initial implementation of Ollama MCP server in TypeScript.
- All core Ollama operations mapped to MCP tools.
- Added support for stdio and SSE transports.
- Created project documentation and setup instructions.

## Next Steps
- Expand test coverage for all MCP tools.
- Monitor for changes in Ollama or MCP SDK APIs and update handlers as needed.
- Improve error reporting and diagnostics.
- Document advanced usage and troubleshooting.

## Active Decisions and Considerations
- Using class-based architecture for extensibility.
- Prioritizing full API coverage and OpenAI compatibility.
- Keeping configuration simple but flexible (env vars for endpoint, timeout, temperature).
- Focusing on robust error handling and streaming support.

## Important Patterns and Preferences
- Tool handler pattern for mapping MCP tools to Ollama operations.
- Centralized error formatting and propagation.
- Preference for explicit, well-documented interfaces.

## Learnings and Project Insights
- MCP tool abstraction enables rapid integration of new Ollama features.
- Streaming and stdio support are critical for flexible deployment.
- Clear documentation and memory bank are essential for maintainability.
