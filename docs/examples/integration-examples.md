# Integration Examples

Examples of integrating Elsai Guardrails with popular frameworks.

## Flask Integration

```python
from flask import Flask, request, jsonify
from elsai_guardrails.guardrails import LLMRails, RailsConfig

app = Flask(__name__)

# Initialize rails
config = RailsConfig.from_content(config_path="config.yml")
rails = LLMRails(config=config)

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        messages = data.get('messages', [])
        
        if not messages:
            return jsonify({'error': 'No messages provided'}), 400
        
        result = rails.generate(
            messages=messages,
            return_details=True
        )
        
        if result['blocked']:
            return jsonify({
                'error': result['block_reason'],
                'message': result['final_response']
            }), 400
        
        return jsonify({
            'response': result['final_response']
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
```

## FastAPI Integration

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from elsai_guardrails.guardrails import LLMRails, RailsConfig
from typing import List, Dict

app = FastAPI()

# Initialize rails
config = RailsConfig.from_content(config_path="config.yml")
rails = LLMRails(config=config)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        
        result = await rails.generate_async(
            messages=messages,
            return_details=True
        )
        
        if result['blocked']:
            raise HTTPException(
                status_code=400,
                detail={
                    'error': result['block_reason'],
                    'message': result['final_response']
                }
            )
        
        return {"response": result['final_response']}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

## Django Integration

```python
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from elsai_guardrails.guardrails import LLMRails, RailsConfig

# Initialize rails (in views.py or separate module)
config = RailsConfig.from_content(config_path="config.yml")
rails = LLMRails(config=config)

@csrf_exempt
@require_http_methods(["POST"])
def chat_view(request):
    try:
        data = json.loads(request.body)
        messages = data.get('messages', [])
        
        if not messages:
            return JsonResponse({'error': 'No messages provided'}, status=400)
        
        result = rails.generate(
            messages=messages,
            return_details=True
        )
        
        if result['blocked']:
            return JsonResponse({
                'error': result['block_reason'],
                'message': result['final_response']
            }, status=400)
        
        return JsonResponse({
            'response': result['final_response']
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
```

## Streamlit Integration

```python
import streamlit as st
from elsai_guardrails.guardrails import LLMRails, RailsConfig

# Initialize rails
@st.cache_resource
def get_rails():
    config = RailsConfig.from_content(config_path="config.yml")
    return LLMRails(config=config)

rails = get_rails()

st.title("Chat with Guardrails")

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat messages
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# React to user input
if prompt := st.chat_input("What is up?"):
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})
    
    # Display user message
    with st.chat_message("user"):
        st.markdown(prompt)
    
    # Generate response
    result = rails.generate(
        messages=st.session_state.messages,
        return_details=True
    )
    
    if result['blocked']:
        response = f"⚠️ {result['final_response']}"
    else:
        response = result['final_response']
    
    # Add assistant response to chat history
    st.session_state.messages.append({"role": "assistant", "content": response})
    
    # Display assistant response
    with st.chat_message("assistant"):
        st.markdown(response)
```

## LangChain Integration

```python
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from elsai_guardrails.guardrails import GuardrailSystem, GuardrailConfig

# Create guardrail system
guardrail_config = GuardrailConfig()
guardrail = GuardrailSystem(config=guardrail_config)

# Wrap LangChain chain with guardrails
class GuardedLLMChain:
    def __init__(self, chain, guardrail):
        self.chain = chain
        self.guardrail = guardrail
    
    def run(self, input_text):
        # Check input
        input_result = self.guardrail.check_input(input_text)
        if not input_result.passed:
            return f"Input blocked: {input_result.message}"
        
        # Run chain
        response = self.chain.run(input_text)
        
        # Check output
        output_result = self.guardrail.check_output(response)
        if not output_result.passed:
            return f"Output blocked: {output_result.message}"
        
        return response

# Usage
# chain = LLMChain(...)
# guarded_chain = GuardedLLMChain(chain, guardrail)
# result = guarded_chain.run("user input")
```

## Next Steps

- [Basic Examples](basic-examples.md) - Simple use cases
- [Advanced Examples](advanced-examples.md) - Complex patterns

