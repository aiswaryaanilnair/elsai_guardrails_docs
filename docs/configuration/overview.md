# Configuration Overview

Elsai Guardrails provides flexible configuration options to customize guardrail behavior for your specific use case.

## Configuration Methods

1. **YAML Configuration** - Recommended for most use cases
2. **Programmatic Configuration** - For dynamic configuration

## Configuration Sections

### LLM Configuration

Configure the language model provider and settings. See [LLM Configuration](llm-config.md) for details.

### Guardrails Configuration

Configure safety checks and validation rules. See [Guardrails Configuration](guardrails-config.md) for details.

## Quick Reference

```yaml
llm:
  engine: "openai"           # LLM provider
  model: "gpt-4o-mini"        # Model name
  api_key: "sk-..."           # API key
  temperature: 0.7             # Generation temperature

guardrails:
  input_checks: true           # Validate input
  output_checks: true          # Validate output
  check_toxicity: true        # Enable toxicity detection
  check_sensitive_data: true  # Enable sensitive data detection
  check_semantic: true        # Enable semantic classification
  toxicity_threshold: 0.7     # Toxicity blocking threshold
  block_toxic: true           # Block toxic content
  block_sensitive_data: true  # Block sensitive data
```

## Configuration Files

See [YAML Configuration](yaml-config.md) for complete configuration file examples.

