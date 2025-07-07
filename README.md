# Ollama MCP Server

> **This is a rebooted and actively maintained fork.**  
> Original project: [NightTrek/Ollama-mcp](https://github.com/NightTrek/Ollama-mcp)  
>  
> This repository ([hyzhak/ollama-mcp-server](https://github.com/hyzhak/ollama-mcp-server)) is a fresh upstream with improved maintenance, metadata, and publishing automation.  
>  
> See [NightTrek/Ollama-mcp](https://github.com/NightTrek/Ollama-mcp) for project history and prior releases.

🚀 A powerful bridge between Ollama and the Model Context Protocol (MCP), enabling seamless integration of Ollama's local LLM capabilities into your MCP-powered applications.

## 🌟 Features

### Complete Ollama Integration
- **Full API Coverage**: Access all essential Ollama functionality through a clean MCP interface
- **OpenAI-Compatible Chat**: Drop-in replacement for OpenAI's chat completion API
- **Local LLM Power**: Run AI models locally with full control and privacy

### Core Capabilities
- 🔄 **Model Management**
  - Pull models from registries
  - Push models to registries
  - List available models
  - Create custom models from Modelfiles
  - Copy and remove models

- 🤖 **Model Execution**
  - Run models with customizable prompts (response is returned only after completion; streaming is not supported in stdio mode)
  - Vision/multimodal support: pass images to compatible models
  - Chat completion API with system/user/assistant roles
  - Configurable parameters (temperature, timeout)
  - **NEW:** `think` parameter for advanced reasoning and transparency (see below)
  - Raw mode support for direct responses

- 🛠 **Server Control**
  - Start and manage Ollama server
  - View detailed model information
  - Error handling and timeout management

## 🚀 Quick Start

### Prerequisites

- [Ollama](https://ollama.ai) installed on your system
- Node.js (with [npx](https://docs.npmjs.com/cli/v10/commands/npx), included with npm)


### Configuration

Add the server to your MCP configuration:

#### For Claude Desktop:
MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ollama": {
      "command": "npx",
      "args": ["ollama-mcp-server"],
      "env": {
        "OLLAMA_HOST": "http://127.0.0.1:11434"  // Optional: customize Ollama API endpoint
      }
    }
  }
}
```

---

## 🛠 Developer Setup

### Prerequisites
- [Ollama](https://ollama.ai) installed on your system
- Node.js and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Build the server:
```bash
npm run build
```

## 🛠 Usage Examples

### Pull and Run a Model
```typescript
// Pull a model
await mcp.use_mcp_tool({
  server_name: "ollama",
  tool_name: "pull",
  arguments: {
    name: "llama2"
  }
});

// Run the model
await mcp.use_mcp_tool({
  server_name: "ollama",
  tool_name: "run",
  arguments: {
    name: "llama2",
    prompt: "Explain quantum computing in simple terms"
  }
});
```

### Run a Vision/Multimodal Model

```typescript
// Run a model with an image (for vision/multimodal models)
await mcp.use_mcp_tool({
  server_name: "ollama",
  tool_name: "run",
  arguments: {
    name: "gemma3:4b",
    prompt: "Describe the contents of this image.",
    imagePath: "./path/to/image.jpg"
  }
});
```

### Chat Completion (OpenAI-compatible)
```typescript
await mcp.use_mcp_tool({
  server_name: "ollama",
  tool_name: "chat_completion",
  arguments: {
    model: "llama2",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant."
      },
      {
        role: "user",
        content: "What is the meaning of life?"
      }
    ],
    temperature: 0.7
  }
});

// Chat with images (for vision/multimodal models)
await mcp.use_mcp_tool({
  server_name: "ollama",
  tool_name: "chat_completion",
  arguments: {
    model: "gemma3:4b",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant."
      },
      {
        role: "user",
        content: "Describe the contents of this image.",
        images: ["./path/to/image.jpg"]
      }
    ]
  }
});
```
> Note: The `images` field is optional and only supported by vision/multimodal models.

### Create Custom Model
```typescript
await mcp.use_mcp_tool({
  server_name: "ollama",
  tool_name: "create",
  arguments: {
    name: "custom-model",
    modelfile: "./path/to/Modelfile"
  }
});
```

## 🧠 Advanced Reasoning with the `think` Parameter

Both the `run` and `chat_completion` tools now support an optional `think` parameter:

- **`think: true`**: Requests the model to provide step-by-step reasoning or "thought process" in addition to the final answer (if supported by the model).
- **`think: false`** (default): Only the final answer is returned.

#### Example (`run` tool):

```typescript
await mcp.use_mcp_tool({
  server_name: "ollama",
  tool_name: "run",
  arguments: {
    name: "deepseek-r1:32b",
    prompt: "how many r's are in strawberry?",
    think: true
  }
});
```

- If the model supports it, the response will include a `<think>...</think>` block with detailed reasoning before the final answer.

#### Example (`chat_completion` tool):

```typescript
await mcp.use_mcp_tool({
  server_name: "ollama",
  tool_name: "chat_completion",
  arguments: {
    model: "deepseek-r1:32b",
    messages: [
      { role: "user", content: "how many r's are in strawberry?" }
    ],
    think: true
  }
});
```

- The model's reasoning (if provided) will be included in the message content.

> **Note:** Not all models support the `think` parameter. Advanced models (e.g., "deepseek-r1:32b", "magistral") may provide more detailed and accurate reasoning when `think` is enabled.

## 🔧 Advanced Configuration

- `OLLAMA_HOST`: Configure custom Ollama API endpoint (default: http://127.0.0.1:11434)
- Timeout settings for model execution (default: 60 seconds)
- Temperature control for response randomness (0-2 range)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

MIT License - feel free to use in your own projects!

---

Built with ❤️ for the MCP ecosystem
