# Guardrails Library Overview

The Elsai Guardrails library provides core classes and functions for implementing guardrails in your LLM applications.

## Core Classes

### GuardrailSystem

The main class for performing guardrail checks on text content.

**Key Features:**
- Toxicity detection
- Sensitive data detection
- Content classification
- Input and output validation

See [GuardrailSystem](guardrail-system.md) for details.

### LLMRails

High-level class that combines LLM generation with guardrail checks.

**Key Features:**
- Integrated LLM and guardrails
- Automatic input/output validation
- Detailed result reporting
- Async support

See [LLMRails](llm-rails.md) for details.

### GuardrailResult

Result object returned from guardrail checks.

**Contains:**
- `passed`: Whether checks passed
- `toxicity`: Toxicity detection results
- `sensitive_data`: Sensitive data detection results
- `semantic_class`: Content classification result
- `message`: Human-readable message

See [GuardrailResult](guardrail-result.md) for details.

## Configuration Classes

### RailsConfig

Configuration container for the entire rails system.

### GuardrailConfig

Configuration for guardrail behavior and thresholds.

## Quick Example

```python
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

# Create guardrail system
config = GuardrailConfig(
    check_toxicity=True,
    check_sensitive_data=True,
    check_semantic=True
)
guardrail = GuardrailSystem(config=config)

# Check text
result = guardrail.check_text("Hello, this is a test")
print(f"Passed: {result.passed}")
```

## Next Steps

- [GuardrailSystem](guardrail-system.md) - Detailed API reference
- [LLMRails](llm-rails.md) - High-level usage
- [GuardrailResult](guardrail-result.md) - Result object details

