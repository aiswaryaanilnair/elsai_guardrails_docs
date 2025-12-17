# Output Rails

Output rails validate LLM responses before they're returned to users.

## Overview

Output rails perform safety checks on LLM-generated content to ensure:
- Responses are not toxic or offensive
- Responses don't contain sensitive data
- Responses don't contain malicious content

## How It Works

1. LLM generates response
2. Output rails validate the response
3. If validation fails, response is blocked
4. If validation passes, response is returned to user

## Configuration

Enable output checks in your configuration:

```yaml
guardrails:
  output_checks: true
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
```

## Usage

### With LLMRails

Output checks are automatic when `output_checks: true`:

```python
from elsai_guardrails.guardrails import LLMRails, RailsConfig

yaml_content = """
llm:
  engine: "openai"
  model: "gpt-4o-mini"
  api_key: "sk-..."

guardrails:
  output_checks: true
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
"""

config = RailsConfig.from_content(yaml_content=yaml_content)
rails = LLMRails(config=config)

# Output will be automatically checked
result = rails.generate(
    messages=[{"role": "user", "content": "user input"}],
    return_details=True
)

if result.get('output_check'):
    print(f"Output passed: {result['output_check'].passed}")
```

### Standalone Output Validation

```python
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

config = GuardrailConfig(
    check_toxicity=True,
    check_sensitive_data=True,
    check_semantic=True
)
guardrail = GuardrailSystem(config=config)

llm_output = "Generated response"
result = guardrail.check_output(llm_output)

if not result.passed:
    print(f"Output blocked: {result.message}")
```

## Block Reasons

Output can be blocked for:

1. **Toxicity**: Toxic or offensive content in response
2. **Sensitive Data**: Personal information in response
3. **Content Issues**: Malicious content or code injection

## Example

```python
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

config = GuardrailConfig()
guardrail = GuardrailSystem(config=config)

# Example 1: Valid output
result = guardrail.check_output("Here is a helpful response.")
print(f"Passed: {result.passed}")  # True

# Example 2: Toxic output
result = guardrail.check_output("This is a toxic response...")
print(f"Passed: {result.passed}")  # False
print(f"Reason: {result.message}")  # "Toxic content detected."

# Example 3: Sensitive data in output
result = guardrail.check_output("Contact us at support@example.com")
print(f"Passed: {result.passed}")  # False
print(f"Reason: {result.message}")  # "Sensitive data detected."
```

## Best Practices

1. **Always enable output checks** for production applications
2. **Monitor blocked outputs** to understand LLM behavior
3. **Adjust thresholds** based on your use case
4. **Provide user feedback** when output is blocked

## Next Steps

- [Input Rails](input-rails.md) - Input validation
- [Toxicity Detection](toxicity-detection.md) - Toxicity checks
- [Sensitive Data Detection](sensitive-data.md) - Sensitive data checks
- [Content Classification](semantic-classification.md) - Content checks

