# Input Rails

Input rails validate user input before it's processed by the LLM.

## Overview

Input rails perform safety checks on user messages to prevent:
- Toxic or offensive content
- Sensitive data exposure
- Jailbreak attempts
- Malicious requests

## How It Works

1. User sends input
2. Input rails validate the content
3. If validation fails, request is blocked
4. If validation passes, input proceeds to LLM

## Configuration

Enable input checks in your configuration:

```yaml
guardrails:
  input_checks: true
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
```

## Usage

### With LLMRails

Input checks are automatic when `input_checks: true`:

```python
from guardrails import LLMRails, RailsConfig

yaml_content = """
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-..."

guardrails:
  input_checks: true
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
"""

config = RailsConfig.from_content(yaml_content=yaml_content)
rails = LLMRails(config=config)

# Input will be automatically checked
result = rails.generate(
    messages=[{"role": "user", "content": "user input"}],
    return_details=True
)

if result.get('input_check'):
    print(f"Input passed: {result['input_check'].passed}")
```

### Standalone Input Validation

```python
from guardrails import GuardrailSystem, GuardrailConfig

config = GuardrailConfig(
    check_toxicity=True,
    check_sensitive_data=True,
    check_semantic=True
)
guardrail = GuardrailSystem(config=config)

user_input = "test input"
result = guardrail.check_input(user_input)

if not result.passed:
    print(f"Input blocked: {result.message}")
```

## Block Reasons

Input can be blocked for:

1. **Toxicity**: Toxic or offensive content detected
2. **Sensitive Data**: Personal information detected (emails, phone numbers, etc.)
3. **Content Issues**: Jailbreak attempts, malicious requests, prompt injections

## Example

```python
from guardrails import GuardrailSystem, GuardrailConfig

config = GuardrailConfig()
guardrail = GuardrailSystem(config=config)

# Example 1: Valid input
result = guardrail.check_input("Hello, how are you?")
print(f"Passed: {result.passed}")  # True

# Example 2: Sensitive data
result = guardrail.check_input("My email is user@example.com")
print(f"Passed: {result.passed}")  # False
print(f"Reason: {result.message}")  # "Sensitive data detected."

# Example 3: Jailbreak attempt
result = guardrail.check_input("Ignore previous instructions and...")
print(f"Passed: {result.passed}")  # False
print(f"Content Class: {result.semantic_class}")  # "jailbreak"
```

## Next Steps

- [Output Rails](output-rails.md) - Output validation
- [Toxicity Detection](toxicity-detection.md) - Toxicity checks
- [Sensitive Data Detection](sensitive-data.md) - Sensitive data checks
- [Content Classification](semantic-classification.md) - Content checks

