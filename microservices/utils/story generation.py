import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser


load_dotenv()

api_key = os.getenv('GOOGLE_API_KEY')


client = ChatGoogleGenerativeAI(model='gemini-2.5-flash',api_key=api_key)
prompt = PromptTemplate(contents="Share some historical background about {product_name} such that the reader feels like they should buy one. in about 120 words",input_variables=['product_name'])

chain = prompt | client | StrOutputParser()
def generate_story(product_name):
    return chain.invoke(product_name)
