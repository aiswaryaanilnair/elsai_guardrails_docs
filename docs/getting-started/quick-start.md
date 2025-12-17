# Quick Start Guide

Get up and running with Elsai Guardrails in minutes.

## Basic Usage

### Step 1: Import Required Modules

```python
from elsai_guardrails.guardrails import LLMRails, RailsConfig
```

### Step 2: Define Configuration

Create a YAML configuration string or file:

```python
yaml_content = """
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "your-api-key-here"
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
"""
```

### Step 3: Create Rails Configuration

```python
config = RailsConfig.from_content(yaml_content=yaml_content)
```

### Step 4: Initialize LLMRails

```python
rails = LLMRails(config=config)
```

### Step 5: Generate with Guardrails

```python
messages = [{"role": "user", "content": "Hello, how are you?"}]
result = rails.generate(messages=messages)
print(result)
```

## Complete Example

```python
from elsai_guardrails.guardrails import LLMRails, RailsConfig

# Configuration
yaml_content = """
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-..."
  temperature: 0.7

guardrails:
  input_checks: true
  output_checks: true
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
"""

# Create and use rails
config = RailsConfig.from_content(yaml_content=yaml_content)
rails = LLMRails(config=config)

# Generate response
response = rails.generate(
    messages=[{"role": "user", "content": "What is artificial intelligence?"}]
)
print(response)
```

## Using Configuration File

Instead of YAML strings, you can use a configuration file:

**config.yml:**
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

**Python code:**
```python
from elsai_guardrails.guardrails import LLMRails, RailsConfig

config = RailsConfig.from_content(config_path="config.yml")
rails = LLMRails(config=config)

result = rails.generate(
    messages=[{"role": "user", "content": "Hello!"}]
)
```

## Next Steps

- [Configuration Guide](../configuration/overview.md) - Learn about all configuration options
- [Python API](../python-api/overview.md) - Explore the full API
- [Examples](../examples/basic-examples.md) - See more examples

