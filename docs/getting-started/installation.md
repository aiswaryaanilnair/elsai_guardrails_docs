---
title: Installation Guide
sidebar: true
outline: deep
---

# Installation Guide

This guide will help you install Elsai Guardrails and set up your development environment.

## Prerequisites

- Python 3.10 or higher
- pip package manager

## Installation

### Basic Installation

```bash
pip install --extra-index-url https://elsai-core-package.optisolbusiness.com/root/elsai-guardrails/ elsai-guardrails==0.1.0
```

## Optional Environment Variables

For semantic content classification (jailbreak detection, prompt injection, etc.), you can configure an embedding encoder. The encoder type is configured via the `ENCODER_TYPE` environment variable.

**If encoder environment variables are not provided, the system will automatically use HuggingFace encoder as the default** (local, no API key required).

### Encoder Configuration

Set the encoder type:

```bash
export ENCODER_TYPE="openai"  # or any supported encoder from the table below
```

### Supported Encoder Types

| Encoder Type | API Key Required | Speed | Quality | Example Environment Variables |
|-------------|-----------------|-------|---------|------------------------------|
| `huggingface` | No (default) | Medium | Good | No configuration needed |
| `openai` | Yes | Fast | Excellent | `OPENAI_API_KEY` |
| `azure_openai` | Yes | Fast | Excellent | `AZURE_OPENAI_EMBEDDING_DEPLOYMENT`<br/>`AZURE_OPENAI_EMBEDDING_ENDPOINT`<br/>`AZURE_OPENAI_EMBEDDING_API_KEY`<br/>`AZURE_OPENAI_EMBEDDING_API_VERSION` |
| `cohere` | Yes | Fast | Excellent | `COHERE_API_KEY` |
| `google` | Yes | Fast | Excellent | `GOOGLE_API_KEY` |
| `fastembed` | No | Very Fast | Good | No configuration needed |
| `ollama` | No | Medium | Good | `OLLAMA_BASE_URL` (optional) |
| `mistral` | Yes | Fast | Excellent | `MISTRAL_API_KEY` |
| `voyage` | Yes | Fast | Excellent | `VOYAGE_API_KEY` |
| `jina` | Yes | Fast | Excellent | `JINA_API_KEY` |
| `bedrock` | Yes | Fast | Excellent | `AWS_ACCESS_KEY_ID`<br/>`AWS_SECRET_ACCESS_KEY`<br/>`AWS_REGION` |
| `bm25` | No | Very Fast | Fair | No configuration needed |
| `tfidf` | No | Very Fast | Fair | No configuration needed |
| `local` | No | Medium | Variable | `LOCAL_MODEL` (model name) |

### Example: Using Azure OpenAI Encoder

```bash
export ENCODER_TYPE="azure_openai"
export AZURE_OPENAI_EMBEDDING_DEPLOYMENT="text-embedding-ada-002"
export AZURE_OPENAI_EMBEDDING_ENDPOINT="https://your-endpoint.openai.azure.com"
export AZURE_OPENAI_EMBEDDING_API_KEY="your-azure-api-key"
export AZURE_OPENAI_EMBEDDING_API_VERSION="2024-02-15-preview"
```

For complete encoder configuration details, see the [Semantic Classification](../guardrails-process/semantic-classification.md#encoder-configuration) documentation.

## Verify Installation

Check that the package is installed correctly:

```bash
pip show elsai-guardrails
```

## Next Steps

- [Quick Start Guide](./quick-start.md)
- [Configuration](./configuration.md)
- [Python API Reference](../python-api/overview.md)
