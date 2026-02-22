import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser


load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")

client = ChatGoogleGenerativeAI(model="gemini-flash-latest", api_key=api_key)

product_description_template = PromptTemplate(
    template="""You are helping an artisan write a product description for their handmade item.

The artisan has described their product (possibly in their native language). Here is what they said:

"{transcribed_text}"

TASK:
Write a short, clear, and attractive product description in 20-30 words.

RULES:
- Use simple English
- Focus on what makes the product special
- Keep it natural and authentic
- Do NOT add fake information
- Make it sound appealing to buyers
- Return ONLY the description, nothing else

PRODUCT DESCRIPTION:
""",
    input_variables=["transcribed_text"],
)

description_chain = product_description_template | client | StrOutputParser()


def generate_product_description(transcribed_text):
    """
    Generate a concise product description from transcribed audio

    Args:
        transcribed_text (str): The transcribed text from artisan's voice recording

    Returns:
        str: A 20-30 word product description
    """
    return description_chain.invoke({"transcribed_text": transcribed_text})
