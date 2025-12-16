# Guardrails Configuration

Configure safety checks and validation rules for your application.

## Configuration Options

### Basic Settings

```yaml
guardrails:
  input_checks: true    # Enable input validation
  output_checks: true   # Enable output validation
```

### Check Types

```yaml
guardrails:
  check_toxicity: true        # Enable toxicity detection
  check_sensitive_data: true  # Enable sensitive data detection
  check_semantic: true       # Enable content classification
```

### Toxicity Settings

```yaml
guardrails:
  check_toxicity: true
  toxicity_threshold: 0.7  # Threshold for blocking (0.0-1.0)
  block_toxic: true        # Block toxic content when detected
```

**Toxicity Threshold**: Content with toxicity confidence above this threshold will be blocked if `block_toxic` is enabled.

### Sensitive Data Settings

```yaml
guardrails:
  check_sensitive_data: true
  block_sensitive_data: true  # Block content containing sensitive data
```

Detected sensitive data types include:
- Email addresses
- Phone numbers
- Credit card numbers
- Social security numbers
- IP addresses
- And more...

### Content Classification

```yaml
guardrails:
  check_semantic: true  # Enable content classification
```

Content classification detects:
- **Jailbreak attempts**: Attempts to bypass safety restrictions
- **Malicious content**: Requests for harmful activities
- **Prompt injection**: Attempts to inject malicious instructions
- **Malicious code injection**: Code injection attempts

## Complete Example

```yaml
guardrails:
  # Enable/disable checks
  input_checks: true
  output_checks: true
  
  # Specific check types
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
  
  # Toxicity configuration
  toxicity_threshold: 0.7
  block_toxic: true
  
  # Sensitive data configuration
  block_sensitive_data: true
```

## Configuration Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `input_checks` | bool | `true` | Enable input validation |
| `output_checks` | bool | `true` | Enable output validation |
| `check_toxicity` | bool | `true` | Enable toxicity detection |
| `check_sensitive_data` | bool | `true` | Enable sensitive data detection |
| `check_semantic` | bool | `true` | Enable content classification |
| `toxicity_threshold` | float | `0.7` | Threshold for blocking toxic content (0.0-1.0) |
| `block_toxic` | bool | `true` | Block toxic content |
| `block_sensitive_data` | bool | `true` | Block sensitive data |

## Use Cases

### Strict Mode

Block all potentially problematic content:

```yaml
guardrails:
  input_checks: true
  output_checks: true
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
  toxicity_threshold: 0.5  # Lower threshold = more strict
  block_toxic: true
  block_sensitive_data: true
```

### Permissive Mode

Only block clearly problematic content:

```yaml
guardrails:
  input_checks: true
  output_checks: true
  check_toxicity: true
  check_sensitive_data: false  # Allow sensitive data
  check_semantic: true
  toxicity_threshold: 0.9  # Higher threshold = more permissive
  block_toxic: true
  block_sensitive_data: false
```

### Input-Only Mode

Only validate input, not output:

```yaml
guardrails:
  input_checks: true
  output_checks: false
  check_toxicity: true
  check_sensitive_data: true
  check_semantic: true
```

## Next Steps

- [LLM Configuration](llm-config.md) - Configure your LLM provider
- [YAML Configuration](yaml-config.md) - Complete configuration examples

