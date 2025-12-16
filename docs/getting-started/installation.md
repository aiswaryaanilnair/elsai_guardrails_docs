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
pip install Elsai-guardrails
```

## Required Environment Variables

For content classification (jailbreak detection), you'll need an embedding encoder. The encoder type is configured via the `ENCODER_TYPE` environment variable (defaults to `azure_openai`). For Azure OpenAI:

```bash
export AZURE_OPENAI_EMBEDDING_DEPLOYMENT="your-deployment-name"
export AZURE_OPENAI_EMBEDDING_ENDPOINT="https://your-endpoint.openai.azure.com"
export AZURE_OPENAI_EMBEDDING_API_KEY="your-api-key"
export AZURE_OPENAI_EMBEDDING_API_VERSION="2024-02-15-preview"
```

## Verify Installation

Check that the package is installed correctly:

```bash
pip show Elsai-guardrails
```

## Next Steps

- [Quick Start Guide](./quick-start.md)
- [Configuration](./configuration.md)
- [Python API Reference](../python-api/overview.md)
