# Toxicity Detection

Toxicity detection identifies toxic, offensive, or harmful content in text.

## Overview

The toxicity detection system classifies content into categories:
- **Toxic**: Clearly toxic or harmful content
- **Offensive**: Offensive but less severe content
- **Non-toxic**: Safe content

## Configuration

Enable toxicity detection:

```yaml
guardrails:
  check_toxicity: true
  toxicity_threshold: 0.7
  block_toxic: true
```

### Parameters

- `check_toxicity`: Enable/disable toxicity detection
- `toxicity_threshold`: Confidence threshold for blocking (0.0-1.0)
- `block_toxic`: Whether to block toxic content

## Usage

### Automatic Detection

Toxicity detection is automatic when enabled:

```python
from elsai_guardrails.guardrails import LLMRails, RailsConfig

yaml_content = """
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-..."

guardrails:
  check_toxicity: true
  toxicity_threshold: 0.7
  block_toxic: true
"""

config = RailsConfig.from_content(yaml_content=yaml_content)
rails = LLMRails(config=config)

result = rails.generate(
    messages=[{"role": "user", "content": "test"}],
    return_details=True
)

if result.get('input_check'):
    toxicity = result['input_check'].toxicity
    print(f"Label: {toxicity.get('label')}")
    print(f"Confidence: {toxicity.get('confidence')}")
```

### Standalone Check

```python
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

config = GuardrailConfig(
    check_toxicity=True,
    toxicity_threshold=0.7,
    block_toxic=True
)
guardrail = GuardrailSystem(config=config)

result = guardrail.check_text("test message")
print(f"Toxicity detected: {result.passed}")
```

## Result Format

Toxicity results are returned in the `toxicity` field:

```python
{
    'label': 'toxic',  # or 'offensive', 'non-toxic'
    'confidence': 0.85  # Confidence score (0.0-1.0)
}
```

## Threshold Tuning

Adjust the threshold based on your needs:

- **Lower threshold (0.5)**: More strict, blocks more content
- **Higher threshold (0.9)**: More permissive, blocks less content
- **Default (0.7)**: Balanced approach

```yaml
guardrails:
  toxicity_threshold: 0.7  # Adjust as needed
```

## Examples

### Non-toxic Content

```python
result = guardrail.check_text("Hello, how are you?")
print(result.passed)  # True
```

### Toxic Content

```python
result = guardrail.check_text("offensive content here")
print(result.passed)  # False
print(result.message)  # "Toxic content detected."
```

## Best Practices

1. **Start with default threshold** (0.7) and adjust based on results
2. **Monitor false positives** and adjust threshold accordingly
3. **Consider your use case** - some applications may need stricter thresholds
4. **Test with your data** to find the optimal threshold

## Next Steps

- [Sensitive Data Detection](sensitive-data.md) - Detect sensitive information
- [Content Classification](semantic-classification.md) - Detect content issues
- [Configuration Guide](../configuration/guardrails-config.md) - Configure guardrails

