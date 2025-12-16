# Separate Input and Output Checks

Learn how to use guardrails separately for input and output validation, giving you full control over your LLM calls.

## Overview

Instead of using `LLMRails` which handles everything automatically, you can use `GuardrailSystem` to check input and output separately. This gives you:

- Full control over LLM invocation
- Ability to use any LLM provider or custom LLM
- Separate handling of input and output validation
- Custom error handling and retry logic

## Basic Pattern

The basic pattern is:

1. **Check input** using `check_input()`
2. **Call your LLM** if input passes
3. **Check output** using `check_output()` 
4. **Return response** if output passes

## Example 1: Basic Separate Checks

```python
from guardrails import GuardrailSystem, GuardrailConfig

# Create guardrail system (no LLM needed)
guardrail = GuardrailSystem.from_config("config.yml")

# Step 1: Check user input
user_input = "What is machine learning?"
input_result = guardrail.check_input(user_input)

if not input_result.passed:
    print(f"Input blocked: {input_result.message}")
    return  # Do not proceed to LLM

# Step 2: Input passed, call your LLM
def my_llm_call(prompt: str) -> str:
    # Replace with your actual LLM call
    return f"Response to: {prompt}"

llm_response = my_llm_call(user_input)

# Step 3: Check LLM output
output_result = guardrail.check_output(llm_response)

if not output_result.passed:
    print(f"Output blocked: {output_result.message}")
    return  # Do not return to user

# Step 4: All checks passed
print(f"Safe response: {llm_response}")
```

## Example 2: With OpenAI

```python
from guardrails import GuardrailSystem
from openai import OpenAI

# Initialize guardrail and LLM
guardrail = GuardrailSystem.from_config("config.yml")
client = OpenAI(api_key="your-api-key")

user_input = "Explain quantum computing"

# Step 1: Check input
input_result = guardrail.check_input(user_input)
if not input_result.passed:
    print(f"Input blocked: {input_result.message}")
    return

# Step 2: Call OpenAI
try:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": user_input}]
    )
    llm_response = response.choices[0].message.content
except Exception as e:
    print(f"LLM error: {str(e)}")
    return

# Step 3: Check output
output_result = guardrail.check_output(llm_response)
if not output_result.passed:
    print(f"Output blocked: {output_result.message}")
    return

# Step 4: Success
print(llm_response)
```

## Example 3: Complete Workflow Function

```python
from guardrails import GuardrailSystem

guardrail = GuardrailSystem.from_config("config.yml")

def process_user_query(user_input: str) -> dict:
    """
    Complete workflow: input check -> LLM call -> output check
    
    Returns:
        dict with 'success', 'response', 'error', and 'blocked_at' keys
    """
    result = {
        'success': False,
        'response': None,
        'error': None,
        'blocked_at': None
    }
    
    # Step 1: Check input
    input_result = guardrail.check_input(user_input)
    if not input_result.passed:
        result['error'] = f"Input blocked: {input_result.message}"
        result['blocked_at'] = 'input'
        return result
    
    # Step 2: Call LLM
    try:
        # Your LLM call here
        llm_response = f"Response to: {user_input}"
    except Exception as e:
        result['error'] = f"LLM error: {str(e)}"
        result['blocked_at'] = 'llm_call'
        return result
    
    # Step 3: Check output
    output_result = guardrail.check_output(llm_response)
    if not output_result.passed:
        result['error'] = f"Output blocked: {output_result.message}"
        result['blocked_at'] = 'output'
        return result
    
    # Step 4: Success
    result['success'] = True
    result['response'] = llm_response
    return result

# Usage
result = process_user_query("What is AI?")
if result['success']:
    print(f"Response: {result['response']}")
else:
    print(f"Blocked at {result['blocked_at']}: {result['error']}")
```

## Example 4: Getting Detailed Results

```python
from guardrails import GuardrailSystem

guardrail = GuardrailSystem.from_config("config.yml")

user_input = "What is artificial intelligence?"
input_result = guardrail.check_input(user_input)

print(f"=== Input Check Details ===")
print(f"Passed: {input_result.passed}")
print(f"Message: {input_result.message}")
print(f"\nToxicity:")
print(f"  Class: {input_result.toxicity.get('label', 'N/A')}")
print(f"  Confidence: {input_result.toxicity.get('confidence', 'N/A')}")
print(f"\nSensitive Data:")
print(f"  Labels: {input_result.sensitive_data.get('predicted_labels', [])}")
print(f"\nContent Class: {input_result.semantic_class}")

if input_result.passed:
    print("\n✅ Input is safe to send to LLM")
else:
    print("\n❌ Input should be blocked")
```

## Example 5: Handling Blocked Input

```python
from guardrails import GuardrailSystem

guardrail = GuardrailSystem.from_config("config.yml")

# Input with sensitive data
user_input = "My email is user@example.com and my phone is 555-1234"
input_result = guardrail.check_input(user_input)

if not input_result.passed:
    print(f"Input blocked: {input_result.message}")
    
    # Check what was detected
    if input_result.sensitive_data.get('predicted_labels'):
        labels = input_result.sensitive_data['predicted_labels']
        if labels != ["No sensitive data detected"]:
            print(f"Sensitive data detected: {labels}")
            print("Please ask user to remove sensitive information")
    
    if input_result.semantic_class:
        print(f"Content issue: {input_result.semantic_class}")
    
    # Do not call LLM
    return
```

## Example 6: Handling Blocked Output

```python
from guardrails import GuardrailSystem

guardrail = GuardrailSystem.from_config("config.yml")

# Simulate LLM response that might be blocked
llm_response = "Here is some information: user@example.com and 555-1234"
output_result = guardrail.check_output(llm_response)

if not output_result.passed:
    print(f"Output blocked: {output_result.message}")
    
    # Check what was detected
    if output_result.sensitive_data.get('predicted_labels'):
        labels = output_result.sensitive_data['predicted_labels']
        if labels != ["No sensitive data detected"]:
            print(f"Sensitive data in output: {labels}")
    
    # Options:
    # 1. Do not return to user
    # 2. Sanitize the response
    # 3. Ask LLM to regenerate without sensitive data
    return

# Output passed, safe to return
print(llm_response)
```

## Example 7: Custom Configuration

```python
from guardrails import GuardrailSystem, GuardrailConfig

# Create custom guardrail config
custom_config = GuardrailConfig(
    check_toxicity=True,
    check_sensitive_data=True,
    check_semantic=True,
    toxicity_threshold=0.5,  # Lower threshold = more strict
    block_toxic=True,
    block_sensitive_data=True
)

# Create guardrail system with custom config
guardrail = GuardrailSystem(
    config=custom_config,
    input_checks=True,
    output_checks=True
)

# Use as before
input_result = guardrail.check_input("test input")
```

## Benefits of Separate Checks

1. **Flexibility**: Use any LLM provider or custom implementation
2. **Control**: Full control over LLM invocation and error handling
3. **Customization**: Different handling for input vs output failures
4. **Integration**: Easy to integrate with existing LLM code
5. **Debugging**: Clear separation of concerns for easier debugging

## When to Use Separate Checks

Use separate checks when:
- You have existing LLM code you want to add guardrails to
- You need custom LLM invocation logic
- You want different error handling for input vs output
- You're using an LLM provider not directly supported
- You need fine-grained control over the process

## When to Use LLMRails

Use `LLMRails` when:
- You want automatic end-to-end guardrails
- You're using a supported LLM provider
- You want the simplest integration
- You don't need custom LLM logic

## Next Steps

- [GuardrailSystem](../guardrails-library/guardrail-system.md) - Detailed API reference
- [Basic Usage](basic-usage.md) - Other usage patterns
- [Examples](../examples/basic-examples.md) - More examples

