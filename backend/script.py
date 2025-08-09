import google.generativeai as genai

# Configure the API key directly (replace 'your-api-key' with your actual Gemini API key)
genai.configure(api_key='AIzaSyAGIjnD6lFtk771FiapiHJhtBFk9shC-zk')

def list_gemini_models():
    try:
        # List all available models
        models = genai.list_models()
        
        # Print the models
        print("Available models in the Gemini API:")
        for model in models:
            print(f"- {model.name}")
            print(f"  Display Name: {model.display_name}")
            print(f"  Description: {model.description}")
            print(f"  Input Token Limit: {model.input_token_limit}")
            print(f"  Output Token Limit: {model.output_token_limit}")
            print(f"  Supported Generation Methods: {model.supported_generation_methods}")
            print()
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    list_gemini_models()