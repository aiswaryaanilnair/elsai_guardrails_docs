# GuardrailResult

The `GuardrailResult` dataclass contains the results of guardrail checks.

## Overview

`GuardrailResult` is returned by all guardrail check methods and provides comprehensive information about the validation results.

## Attributes

### passed

**Type:** `bool`

Whether all guardrail checks passed.

```python
if result.passed:
    print("Content is safe")
else:
    print("Content was blocked")
```

### toxicity

**Type:** `Dict[str, Any]`

Toxicity detection results. Contains:
- `label`: Predicted class ('toxic', 'offensive', 'non-toxic')
- `confidence`: Confidence score (0.0-1.0)

```python
toxicity = result.toxicity
print(f"Label: {toxicity.get('label')}")
print(f"Confidence: {toxicity.get('confidence')}")
```

### sensitive_data

**Type:** `Dict[str, Any]`

Sensitive data detection results. Contains:
- `predicted_labels`: List of detected sensitive data types

```python
sensitive = result.sensitive_data
labels = sensitive.get('predicted_labels', [])
if labels and labels != ["No sensitive data detected"]:
    print(f"Detected: {labels}")
```

### semantic_class

**Type:** `str`

Content classification result. Possible values:
- `"jailbreak"`: Jailbreak attempt detected
- `"malicious"`: Malicious content detected
- `"prompt_injection"`: Prompt injection detected
- `"malicious_code_injection"`: Code injection detected
- `"misc"`: Other problematic content
- Empty string if no semantic issues detected

```python
if result.semantic_class:
    print(f"Content class: {result.semantic_class}")
```

### message

**Type:** `str`

Human-readable message describing the result.

```python
print(result.message)
```

## Example Usage

### Basic Check

```python
from guardrails import GuardrailSystem, GuardrailConfig

config = GuardrailConfig()
guardrail = GuardrailSystem(config=config)

result = guardrail.check_text("Hello, this is a test")

print(f"Passed: {result.passed}")
print(f"Message: {result.message}")
```

### Detailed Analysis

```python
result = guardrail.check_text("test input")

# Check overall result
if not result.passed:
    print(f"Blocked: {result.message}")
    
    # Check toxicity
    if result.toxicity:
        toxicity_label = result.toxicity.get('label')
        toxicity_conf = result.toxicity.get('confidence')
        if toxicity_label in ['toxic', 'offensive']:
            print(f"Toxicity: {toxicity_label} (confidence: {toxicity_conf})")
    
    # Check sensitive data
    if result.sensitive_data:
        labels = result.sensitive_data.get('predicted_labels', [])
        if labels and labels != ["No sensitive data detected"]:
            print(f"Sensitive data: {labels}")
    
    # Check content class
    if result.semantic_class:
        print(f"Content issue: {result.semantic_class}")
```

### From LLMRails

```python
from guardrails import LLMRails, RailsConfig

config = RailsConfig.from_content(yaml_content=yaml_content)
rails = LLMRails(config=config)

result = rails.generate(
    messages=[{"role": "user", "content": "test"}],
    return_details=True
)

# Access input check result
if result.get('input_check'):
    input_result = result['input_check']
    print(f"Input passed: {input_result.passed}")
    print(f"Toxicity: {input_result.toxicity}")
    print(f"Sensitive: {input_result.sensitive_data}")
    print(f"Semantic: {input_result.semantic_class}")

# Access output check result
if result.get('output_check'):
    output_result = result['output_check']
    print(f"Output passed: {output_result.passed}")
```

## Result Examples

### Passed Result

```python
GuardrailResult(
    passed=True,
    toxicity={'label': 'non-toxic', 'confidence': 0.1},
    sensitive_data={'predicted_labels': ['No sensitive data detected']},
    semantic_class='',
    message='All checks passed'
)
```

### Blocked Result (Toxicity)

```python
GuardrailResult(
    passed=False,
    toxicity={'label': 'toxic', 'confidence': 0.85},
    sensitive_data={'predicted_labels': ['No sensitive data detected']},
    semantic_class='',
    message='Toxic content detected.'
)
```

### Blocked Result (Sensitive Data)

```python
GuardrailResult(
    passed=False,
    toxicity={'label': 'non-toxic', 'confidence': 0.1},
    sensitive_data={'predicted_labels': ['Email']},
    semantic_class='',
    message='Sensitive data detected.'
)
```

### Blocked Result (Content Classification)

```python
GuardrailResult(
    passed=False,
    toxicity={'label': 'non-toxic', 'confidence': 0.1},
    sensitive_data={'predicted_labels': ['No sensitive data detected']},
    semantic_class='jailbreak',
    message='Jailbreak attempt detected.'
)
```

## Next Steps

- [GuardrailSystem](guardrail-system.md) - Using guardrail checks
- [LLMRails](llm-rails.md) - High-level API
- [Python API](../python-api/overview.md) - More examples

