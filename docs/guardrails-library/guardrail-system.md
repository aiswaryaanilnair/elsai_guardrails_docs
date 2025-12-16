# GuardrailSystem

The `GuardrailSystem` class provides core guardrail functionality for validating text content.

## Overview

`GuardrailSystem` performs safety checks on text content, including:
- Toxicity detection
- Sensitive data detection
- Content classification (jailbreak, malicious content, etc.)

## Initialization

### Basic Initialization

```python
from guardrails import GuardrailSystem, GuardrailConfig

config = GuardrailConfig()
guardrail = GuardrailSystem(config=config)
```

### With Custom Configuration

```python
config = GuardrailConfig(
    check_toxicity=True,
    check_sensitive_data=True,
    check_semantic=True,
    toxicity_threshold=0.7,
    block_toxic=True,
    block_sensitive_data=True
)
guardrail = GuardrailSystem(config=config)
```

### From Config File

```python
guardrail = GuardrailSystem.from_config("config.yml")
```

### With Input/Output Checks

```python
guardrail = GuardrailSystem(
    config=config,
    input_checks=True,
    output_checks=True
)
```

## Methods

### check_input()

Check user input through guardrails. This method is designed for validating user input before it's sent to an LLM.

```python
result = guardrail.check_input("user input text")
```

**Parameters:**
- `user_input` (str): User input to validate

**Returns:**
- `GuardrailResult`: Result object

**Note:** Adds "Please rephrase your input." to message if check fails.

**Example - Separate Input Check:**
```python
from guardrails import GuardrailSystem, GuardrailConfig

# Create guardrail system (no LLM needed for separate checks)
guardrail = GuardrailSystem.from_config("config.yml")

# Step 1: Check user input
user_input = "What is machine learning?"
input_result = guardrail.check_input(user_input)

if not input_result.passed:
    print(f"Input blocked: {input_result.message}")
    # Do not proceed to LLM
    return

# Step 2: Input passed, now call your LLM manually
# (Your LLM call here)

# Step 3: Check LLM output
output_result = guardrail.check_output(llm_response)
```

### check_output()

Check LLM output through guardrails. This method is designed for validating LLM-generated responses before returning them to users.

```python
result = guardrail.check_output("LLM generated response")
```

**Parameters:**
- `llm_output` (str): LLM output to validate

**Returns:**
- `GuardrailResult`: Result object

**Note:** Adds "LLM response has been blocked." to message if check fails.

**Example - Separate Output Check:**
```python
# After receiving LLM response
llm_response = "Generated response from LLM..."

# Check output
output_result = guardrail.check_output(llm_response)

if not output_result.passed:
    print(f"Output blocked: {output_result.message}")
    # Do not return this response to user
    # Consider sanitizing or asking LLM to regenerate
    return

# Output passed, safe to return to user
print(llm_response)
```

## Example Usage

### Basic Text Check

```python
from guardrails import GuardrailSystem, GuardrailConfig

config = GuardrailConfig(
    check_toxicity=True,
    check_sensitive_data=True,
    check_semantic=True
)
guardrail = GuardrailSystem(config=config)

# Check text
result = guardrail.check_text("Hello, how are you?")
if result.passed:
    print("Text passed all checks")
else:
    print(f"Text blocked: {result.message}")
```

### Separate Input and Output Checks

This pattern gives you full control over the LLM call while still having guardrails:

```python
from guardrails import GuardrailSystem, GuardrailConfig

# Create guardrail system (no LLM needed)
guardrail = GuardrailSystem.from_config("config.yml")

def process_user_query(user_input: str):
    """Complete workflow: input check -> LLM call -> output check"""
    
    # Step 1: Check user input
    input_result = guardrail.check_input(user_input)
    if not input_result.passed:
        return {
            'success': False,
            'error': f"Input blocked: {input_result.message}",
            'blocked_at': 'input'
        }
    
    # Step 2: Call your LLM (input passed)
    try:
        # Replace with your actual LLM call
        from openai import OpenAI
        client = OpenAI(api_key="your-key")
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": user_input}]
        )
        llm_response = response.choices[0].message.content
    except Exception as e:
        return {
            'success': False,
            'error': f"LLM error: {str(e)}",
            'blocked_at': 'llm_call'
        }
    
    # Step 3: Check LLM output
    output_result = guardrail.check_output(llm_response)
    if not output_result.passed:
        return {
            'success': False,
            'error': f"Output blocked: {output_result.message}",
            'blocked_at': 'output'
        }
    
    # Step 4: Success
    return {
        'success': True,
        'response': llm_response
    }

# Usage
result = process_user_query("What is AI?")
if result['success']:
    print(f"Response: {result['response']}")
else:
    print(f"Blocked at {result['blocked_at']}: {result['error']}")
```

### Input Validation Only

```python
user_input = "My email is user@example.com"
result = guardrail.check_input(user_input)

if not result.passed:
    print(f"Input blocked: {result.message}")
    print(f"Reason: {result.sensitive_data.get('predicted_labels', [])}")
    # Ask user to remove sensitive information
```

### Output Validation Only

```python
llm_output = "Here is the response..."
result = guardrail.check_output(llm_output)

if not result.passed:
    print(f"Output blocked: {result.message}")
    # Do not return to user, consider sanitizing or regenerating
```

## Configuration Options

See [GuardrailConfig](../configuration/guardrails-config.md) for all configuration options.

## Result Object

The `check_text()`, `check_input()`, and `check_output()` methods return a `GuardrailResult` object. See [GuardrailResult](guardrail-result.md) for details.

## Next Steps

- [LLMRails](llm-rails.md) - High-level API with LLM integration
- [GuardrailResult](guardrail-result.md) - Understanding results
- [Configuration Guide](../configuration/guardrails-config.md) - Configuration options

