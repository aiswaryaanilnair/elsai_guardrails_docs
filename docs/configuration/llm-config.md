# LLM Configuration

Configure your language model provider and settings.

## Supported Providers

- OpenAI
- Azure OpenAI
- Anthropic Claude
- Google Gemini
- AWS Bedrock

## OpenAI

### Configuration

```yaml
llm:
  engine: "openai"
  model: "gpt-4o-mini"  # Options: gpt-4, gpt-4-turbo, gpt-3.5-turbo, etc.
  api_key: "sk-..."
  temperature: 0.7      # Optional, default: 0.1
```

### Example

```python
yaml_content = """
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-proj-..."
  temperature: 0.7
"""
```

## Azure OpenAI

### Configuration

```yaml
llm:
  engine: "azure_openai"
  endpoint: "https://your-resource.openai.azure.com"
  api_version: "2024-02-15-preview"
  api_key: "your-api-key"
  model: "gpt-4"  # Deployment name
  temperature: 0.7
```

### Example

```python
yaml_content = """
llm:
  engine: "azure_openai"
  endpoint: "https://my-resource.openai.azure.com"
  api_version: "2024-02-15-preview"
  api_key: "abc123..."
  model: "gpt-4"
  temperature: 0.7
"""
```

## Anthropic Claude

### Configuration

```yaml
llm:
  engine: "anthropic"
  model: "claude-3-sonnet-20240229"  # or claude-3-opus, claude-3-haiku
  api_key: "sk-ant-..."
```

### Example

```python
yaml_content = """
llm:
  engine: "anthropic"
  model: "claude-3-sonnet-20240229"
  api_key: "sk-ant-..."
"""
```

## Google Gemini

### Configuration

```yaml
llm:
  engine: "gemini"
  model: "gemini-pro"  # or gemini-pro-vision
  api_key: "your-api-key"
```

### Example

```python
yaml_content = """
llm:
  engine: "gemini"
  model: "gemini-pro"
  api_key: "AIza..."
"""
```

## AWS Bedrock

### Configuration

```yaml
llm:
  engine: "bedrock"
  aws_access_key: "your-access-key"
  aws_secret_key: "your-secret-key"
  aws_session_token: "your-session-token"  # Optional
  aws_region: "us-east-1"
  model_id: "anthropic.claude-v2"  # or other Bedrock models
  max_tokens: 500
  temperature: 0.7
```

### Example

```python
yaml_content = """
llm:
  engine: "bedrock"
  aws_access_key: "AKIA..."
  aws_secret_key: "wJalr..."
  aws_region: "us-east-1"
  model_id: "anthropic.claude-v2"
  max_tokens: 500
  temperature: 0.7
"""
```

## Common Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `engine` | string | LLM provider | Required |
| `model` | string | Model name | Required |
| `api_key` | string | API key | Required |
| `temperature` | float | Generation temperature | 0.1-0.7 |

## Environment Variables

For security, you can use environment variables instead of hardcoding API keys:

```python
import os

yaml_content = f"""
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "{os.getenv('OPENAI_API_KEY')}"
"""
```

## Next Steps

- [Guardrails Configuration](guardrails-config.md) - Configure safety checks
- [YAML Configuration](yaml-config.md) - Complete configuration reference

