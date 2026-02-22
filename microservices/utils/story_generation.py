import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser


load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")


client = ChatGoogleGenerativeAI(model="gemini-flash-latest", api_key=api_key)

product_prompt = PromptTemplate(
    template="Share some historical background about {product_name} such that the reader feels like they should buy one. in about 120 words",
    input_variables=["product_name"],
)

artisan_story_template = PromptTemplate(
    template="""You are helping an artisan write their story for customers.

I am an artisan. Here is my information:

Name: {name}
Craft / Product: {craft}
Experience: {experience} years
Place: {place}
How I learned this craft: {learning_source}
Materials I use: {materials}
What makes my work special: {special_aspect}

TASK:
Use the information above and write a short, simple, and attractive story (80–120 words).
The story should sound natural, like the artisan is speaking.
Use easy English.
Do not add fake information.
Return only the story.

FINAL STORY:
""",
    input_variables=[
        "name",
        "craft",
        "experience",
        "place",
        "learning_source",
        "materials",
        "special_aspect",
    ],
)

# Fallback template for transcribed audio (old method)
artisan_transcription_template = PromptTemplate(
    template="""You are helping small artisans tell their story in a simple and attractive way.

TASK:
1. Read the Artisan Story below (it can be in any language).
2. Understand what the artisan is saying about:
   - their craft or product
   - their journey or experience
   - tradition or family background (if mentioned)
3. Rewrite it into a clear, engaging story in about 90–120 words.

WRITING STYLE:
- Use simple and natural English (not complex or fancy words).
- Keep the artisan's voice authentic.
- If the artisan says "I" or "we", keep that perspective.
- Do NOT invent new facts.
- Organize the story smoothly so it is easy to read.
- Make it emotional and attractive, but still realistic.

GOAL:
The reader should understand the artisan's journey and feel connected to the product.

IMPORTANT:
Return ONLY the final story. No explanations.

ARTISAN STORY:
{artisan_story}

FINAL STORY:
""",
    input_variables=["artisan_story"],
)

product_chain = product_prompt | client | StrOutputParser()
artisan_chain = artisan_story_template | client | StrOutputParser()
artisan_transcription_chain = (
    artisan_transcription_template | client | StrOutputParser()
)


def generate_product_story(product_name):
    return product_chain.invoke({"product_name": product_name})


def generate_artisan_story_from_data(
    name, craft, experience, place, learning_source="", materials="", special_aspect=""
):
    """Generate artisan story from structured data"""
    return artisan_chain.invoke(
        {
            "name": name,
            "craft": craft,
            "experience": experience,
            "place": place,
            "learning_source": learning_source or "Self-learned",
            "materials": materials or "Traditional materials",
            "special_aspect": special_aspect or "Handmade with care and tradition",
        }
    )


def generate_artisan_story(artisan_story):
    """Generate artisan story from transcribed audio (fallback)"""
    return artisan_transcription_chain.invoke({"artisan_story": artisan_story})
