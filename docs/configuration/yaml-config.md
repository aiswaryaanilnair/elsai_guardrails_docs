# YAML Configuration Reference

Complete reference for YAML configuration files.

## Full Configuration Template

```yaml
llm:
  engine: "openai"              # Required: LLM provider
  model: "gpt-4o-mini"          # Required: Model name
  api_key: "sk-..."             # Required: API key
  temperature: 0.7              # Optional: Generation temperature

guardrails:
  # Check enablement
  input_checks: true             # Enable input validation
  output_checks: true            # Enable output validation
  
  # Check types
  check_toxicity: true          # Enable toxicity detection
  check_sensitive_data: true    # Enable sensitive data detection
  check_semantic: true          # Enable semantic classification
  
  # Toxicity settings
  toxicity_threshold: 0.7       # Threshold for blocking (0.0-1.0)
  block_toxic: true             # Block toxic content
  
  # Sensitive data settings
  block_sensitive_data: true    # Block sensitive data
```

## Provider-Specific Examples

### OpenAI

```yaml
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-proj-..."
  temperature: 0.7

guardrails:
  input_checks: true
  output_checks: true
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
  toxicity_threshold: 0.7
  block_toxic: true
  block_sensitive_data: true
```

### Azure OpenAI

```yaml
llm:
  engine: "azure_openai"
  endpoint: "https://your-resource.openai.azure.com"
  api_version: "2024-02-15-preview"
  api_key: "your-api-key"
  model: "gpt-4"
  temperature: 0.7

guardrails:
  input_checks: true
  output_checks: true
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
```

### Anthropic

```yaml
llm:
  engine: "anthropic"
  model: "claude-3-sonnet-20240229"
  api_key: "sk-ant-..."

guardrails:
  input_checks: true
  output_checks: true
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
```

### Gemini

```yaml
llm:
  engine: "gemini"
  model: "gemini-pro"
  api_key: "AIza..."

guardrails:
  input_checks: true
  output_checks: true
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
```

### AWS Bedrock

```yaml
llm:
  engine: "bedrock"
  aws_access_key: "AKIA..."
  aws_secret_key: "wJalr..."
  aws_region: "us-east-1"
  model_id: "anthropic.claude-v2"
  max_tokens: 500
  temperature: 0.7

guardrails:
  input_checks: true
  output_checks: true
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
```

## Minimal Configuration

```yaml
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-..."

guardrails:
  input_checks: true
  output_checks: true
```

## Using Configuration Files

### Loading from File

```python
from guardrails import LLMRails, RailsConfig

config = RailsConfig.from_content(config_path="config.yml")
rails = LLMRails(config=config)
```

### Loading from String

```python
from guardrails import LLMRails, RailsConfig

yaml_content = """
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-..."
"""

config = RailsConfig.from_content(yaml_content=yaml_content)
rails = LLMRails(config=config)
```

## Configuration Validation

The configuration is validated when creating `RailsConfig`. Invalid configurations will raise errors:

- Missing required fields
- Invalid engine names
- Invalid threshold values
- Missing API keys (if LLM is configured)

## Environment Variables

For security, use environment variables for sensitive data:

```yaml
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "${OPENAI_API_KEY}"  # Use environment variable
```

Or in Python:

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

- [LLM Configuration](llm-config.md) - Detailed LLM setup
- [Guardrails Configuration](guardrails-config.md) - Detailed guardrails setup

