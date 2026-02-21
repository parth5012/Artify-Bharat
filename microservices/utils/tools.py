from langchain_community.tools import DuckDuckGoSearchRun



search_tool = DuckDuckGoSearchRun(region="us-en")


tools = [
    search_tool,
]