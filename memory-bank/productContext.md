# Product Context

## Why This Project Exists
Ollama MCP Server enables seamless integration of Ollama's local LLM capabilities into any MCP-powered application. It solves the problem of connecting local AI models to the broader MCP ecosystem, allowing developers to leverage local inference, privacy, and control.

## Problems It Solves
- Lack of a standard interface for accessing Ollama from MCP tools.
- Need for local, private LLM execution in MCP workflows.
- Complexity of bridging CLI/HTTP APIs with MCP conventions.

## How It Should Work
- MCP clients interact with the server using standard MCP tool calls.
- Each Ollama operation (model management, execution, chat completion) is exposed as a tool.
- The server translates MCP requests to Ollama CLI or API calls and returns results in MCP format.
- Supports both stdio and SSE transports for flexibility.

## User Experience Goals
- Simple integration for MCP clients.
- Transparent access to all core Ollama features.
- Fast, reliable, and robust error handling.
- Configurable for advanced users (custom endpoints, timeouts, temperature).
