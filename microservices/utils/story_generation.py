import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser


load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")


client = ChatGoogleGenerativeAI(model="gemini-2.5-flash", api_key=api_key)
product_prompt = PromptTemplate(
    template="Share some historical background about {product_name} such that the reader feels like they should buy one. in about 120 words",
    input_variables=["product_name"],
)
artisan_story_template = PromptTemplate(
    template="""
    You are an expert cultural storyteller and copywriter. 
    
    TASK:
    1. Analyze the 'Artisan Story' provided below (which may be in any language).
    2. Identify the craft or product being described.
    3. Rewrite the story into a compelling, 120-word historical and emotional narrative in English.
    
    TONE & STYLE:
    - Language: English only.
    - Style: Evocative, sophisticated, and deeply respectful of the heritage.
    - Goal: Make the reader feel like they are purchasing a piece of history, not just a product.
    - Note: Return story only.
    
    ARTISAN STORY: 
    {artisan_story}

    REFINED NARRATIVE:(NO PREAMBLES!!)
    """,
    input_variables=["artisan_story"],
)

product_chain = product_prompt | client | StrOutputParser()
artisan_chain = artisan_story_template | client | StrOutputParser()


def generate_product_story(product_name):
    return product_chain.invoke({"product_name": product_name})

def generate_artisan_story(artisan_story):
    return artisan_chain.invoke({"artisan_story": artisan_story})