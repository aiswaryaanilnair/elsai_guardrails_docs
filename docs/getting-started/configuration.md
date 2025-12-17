# Configuration Overview

Elsai Guardrails uses YAML-based configuration for easy setup and customization.

## Configuration Structure

The configuration consists of two main sections:

1. **LLM Configuration**: Settings for the language model
2. **Guardrails Configuration**: Settings for safety checks

## Basic Configuration

```yaml
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "your-api-key"
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

## LLM Configuration

### Supported Engines

- `openai` - OpenAI API
- `azure_openai` - Azure OpenAI Service
- `anthropic` - Anthropic Claude
- `gemini` - Google Gemini
- `bedrock` - AWS Bedrock

### OpenAI Configuration

```yaml
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-..."
  temperature: 0.7
```

### Azure OpenAI Configuration

```yaml
llm:
  engine: "azure_openai"
  endpoint: "https://your-endpoint.openai.azure.com"
  api_version: "2024-02-15-preview"
  api_key: "your-api-key"
  model: "gpt-4"
  temperature: 0.7
```

### Anthropic Configuration

```yaml
llm:
  engine: "anthropic"
  model: "claude-3-sonnet-20240229"
  api_key: "your-api-key"
```

### Gemini Configuration

```yaml
llm:
  engine: "gemini"
  model: "gemini-pro"
  api_key: "your-api-key"
```

### AWS Bedrock Configuration

```yaml
llm:
  engine: "bedrock"
  aws_access_key: "your-access-key"
  aws_secret_key: "your-secret-key"
  aws_region: "us-east-1"
  model_id: "anthropic.claude-v2"
  max_tokens: 500
  temperature: 0.7
```

## Guardrails Configuration

### Basic Options

```yaml
guardrails:
  # Enable/disable input/output checks
  input_checks: true
  output_checks: true
  
  # Enable/disable specific checks
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
  
  # Toxicity settings
  toxicity_threshold: 0.7  # Threshold for blocking (0.0-1.0)
  block_toxic: true        # Block toxic content
  
  # Sensitive data settings
  block_sensitive_data: true  # Block sensitive data
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `input_checks` | bool | `true` | Enable input validation |
| `output_checks` | bool | `true` | Enable output validation |
| `check_toxicity` | bool | `true` | Enable toxicity detection |
| `check_sensitive_data` | bool | `true` | Enable sensitive data detection |
| `check_semantic` | bool | `true` | Enable content classification |
| `toxicity_threshold` | float | `0.7` | Threshold for blocking toxic content |
| `block_toxic` | bool | `true` | Block toxic content |
| `block_sensitive_data` | bool | `true` | Block sensitive data |

## Loading Configuration

### From YAML String

```python
from elsai_guardrails.guardrails import RailsConfig

yaml_content = """
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-..."

guardrails:
  input_checks: true
  output_checks: true
"""

config = RailsConfig.from_content(yaml_content=yaml_content)
```

### From File

```python
config = RailsConfig.from_content(config_path="config.yml")
```

## Programmatic Configuration

You can also create configuration programmatically:

```python
from elsai_guardrails.guardrails import RailsConfig, GuardrailConfig

guardrail_config = GuardrailConfig(
    check_toxicity=True,
    check_sensitive_data=True,
    check_semantic=True,
    toxicity_threshold=0.7,
    block_toxic=True,
    block_sensitive_data=True
)

llm_config = {
    "engine": "openai",
    "model": "gpt-4o-mini",
    "api_key": "sk-...",
    "temperature": 0.7
}

config = RailsConfig(
    guardrail_config=guardrail_config,
    llm_config=llm_config,
    input_checks=True,
    output_checks=True
)
```

## Next Steps

- [LLM Configuration](../configuration/llm-config.md) - Detailed LLM setup
- [Guardrails Configuration](../configuration/guardrails-config.md) - Detailed guardrails setup
- [YAML Configuration](../configuration/yaml-config.md) - Complete YAML reference

