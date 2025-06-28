# Project Brief

## Project Name

Ollama MCP Server

## Purpose

Provide a bridge between Ollama's local LLM API and the Model Context Protocol (MCP), enabling MCP-compatible tools to access and control Ollama models programmatically.

## Core Requirements

- Expose Ollama model management and execution as MCP tools.
- Support OpenAI-compatible chat completion via MCP.
- Enable local LLM usage with privacy and full control.
- Provide robust error handling and configurable parameters.

## Scope

- Integrate all essential Ollama API and CLI features into MCP.
- Support both CLI and HTTP transports (stdio and SSE).
- Allow model creation, listing, pulling, pushing, copying, removing, and running (with prompt, images, and temperature parameters).
- Enable advanced configuration (timeouts, temperature, endpoint).  
- The "run" tool supports an optional temperature parameter for deterministic or creative outputs.
- Maintain compatibility with MCP server conventions.

## Out of Scope

- Web UI or frontend components.
- Non-Ollama LLM integrations.
- Cloud deployment automation.
