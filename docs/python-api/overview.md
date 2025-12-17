# Python API Overview

The Elsai Guardrails Python API provides a simple and powerful interface for adding guardrails to your LLM applications.

## Quick Start

```python
from elsai_guardrails.guardrails import LLMRails, RailsConfig

# Configure
yaml_content = """
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-..."

guardrails:
  input_checks: true
  output_checks: true
"""

# Create and use
config = RailsConfig.from_content(yaml_content=yaml_content)
rails = LLMRails(config=config)

# Generate with guardrails
response = rails.generate(
    messages=[{"role": "user", "content": "Hello!"}]
)
```

## Core Classes

### LLMRails

High-level class for LLM generation with guardrails.

```python
rails = LLMRails(config=config)
result = rails.generate(messages=messages)
```

See [Basic Usage](basic-usage.md) for details.

### GuardrailSystem

Lower-level class for guardrail checks only.

```python
guardrail = GuardrailSystem(config=config)
result = guardrail.check_text("text to check")
```

### RailsConfig

Configuration container.

```python
config = RailsConfig.from_content(yaml_content=yaml_content)
```

### GuardrailConfig

Guardrail-specific configuration.

```python
config = GuardrailConfig(
    check_toxicity=True,
    check_sensitive_data=True
)
```

## Common Patterns

### Basic Generation

```python
rails = LLMRails(config=config)
response = rails.generate(messages=[{"role": "user", "content": "Hello"}])
```

### Detailed Results

```python
result = rails.generate(
    messages=[{"role": "user", "content": "test"}],
    return_details=True
)
print(f"Blocked: {result['blocked']}")
```

### Async Generation

```python
result = await rails.generate_async(messages=messages)
```

### Input/Output Validation Only

```python
guardrail = GuardrailSystem(config=config)
input_result = guardrail.check_input("user input")
output_result = guardrail.check_output("llm output")
```

## Next Steps

- [Basic Usage](basic-usage.md) - Common use cases
- [Advanced Usage](advanced-usage.md) - Advanced patterns
- [Async Support](async-support.md) - Asynchronous operations

