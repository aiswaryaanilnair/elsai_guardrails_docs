# Sensitive Data Detection

Sensitive data detection identifies and protects personal information in text.

## Overview

The sensitive data detection system identifies various types of personal information:
- Email addresses
- Phone numbers
- Credit card numbers
- Social security numbers
- IP addresses
- And more...

## Configuration

Enable sensitive data detection:

```yaml
guardrails:
  check_sensitive_data: true
  block_sensitive_data: true
```

### Parameters

- `check_sensitive_data`: Enable/disable sensitive data detection
- `block_sensitive_data`: Whether to block content containing sensitive data

## Usage

### Automatic Detection

Sensitive data detection is automatic when enabled:

```python
from elsai_guardrails.guardrails import LLMRails, RailsConfig

yaml_content = """
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-..."

guardrails:
  check_sensitive_data: true
  block_sensitive_data: true
"""

config = RailsConfig.from_content(yaml_content=yaml_content)
rails = LLMRails(config=config)

result = rails.generate(
    messages=[{"role": "user", "content": "My email is user@example.com"}],
    return_details=True
)

if result.get('input_check'):
    sensitive = result['input_check'].sensitive_data
    print(f"Detected: {sensitive.get('predicted_labels', [])}")
```

### Standalone Check

```python
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

config = GuardrailConfig(
    check_sensitive_data=True,
    block_sensitive_data=True
)
guardrail = GuardrailSystem(config=config)

result = guardrail.check_text("My email is user@example.com")
print(f"Safe to return: {result.passed}")
```

## Result Format

Sensitive data results are returned in the `sensitive_data` field:

```python
{
    'predicted_labels': ['Email']  # List of detected types
}
```

If no sensitive data is detected:
```python
{
    'predicted_labels': ['No sensitive data detected']
}
```

## Detected Types

Common sensitive data types include:
- Email
- Phone
- CreditCard
- SSN
- IPAddress
- And more...

## Examples

### No Sensitive Data

```python
result = guardrail.check_text("Hello, how are you?")
print(result.passed)  # True
```

### Email Detected

```python
result = guardrail.check_text("My email is user@example.com")
print(result.passed)  # False
print(result.message)  # "Sensitive data detected."
```

### Multiple Types Detected

```python
result = guardrail.check_text("Email: user@example.com, Phone: 555-1234")
print(result.passed)  # False
```

## Use Cases

### Strict Mode (Block All)

```yaml
guardrails:
  check_sensitive_data: true
  block_sensitive_data: true
```

### Permissive Mode (Detect but Don't Block)

```yaml
guardrails:
  check_sensitive_data: true
  block_sensitive_data: false  # Detect but allow
```

### Detection Only (No Blocking)

```yaml
guardrails:
  check_sensitive_data: true
  block_sensitive_data: false
```

## Best Practices

1. **Enable blocking in production** to protect user privacy
2. **Monitor detected data** to understand what users are sharing
3. **Consider use case** - some applications may need to allow certain types
4. **Provide clear feedback** when sensitive data is detected

## Next Steps

- [Toxicity Detection](toxicity-detection.md) - Detect toxic content
- [Content Classification](semantic-classification.md) - Detect content issues
- [Configuration Guide](../configuration/guardrails-config.md) - Configure guardrails

