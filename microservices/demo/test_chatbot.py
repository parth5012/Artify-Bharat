import sys
import os
from colorama import Fore, Style
from langchain_core.messages import HumanMessage, AIMessage, ToolMessage


# Get the absolute path of the directory containing the current script
current_dir = os.path.dirname(os.path.abspath(__file__))

# Get the absolute path of the parent directory
parent_dir = os.path.dirname(current_dir)

# Add the parent directory to sys.path
sys.path.append(parent_dir)

from utils.chatbot import chatbot


def output_stream(chatbot, user_input):
    inputs = {"messages": [HumanMessage(content=user_input)]}

    for message_chunk, metadata in chatbot.stream(
        inputs,
        stream_mode="messages",
    ):
        # 1. Handle AI Messages (Thoughts & Text)
        if isinstance(message_chunk, AIMessage):
            # A: Check for Tool Calls (Thinking Phase)
            if message_chunk.tool_calls:
                for tool in message_chunk.tool_calls:
                    print(
                        f"\n{Fore.YELLOW}[THOUGHT] I'll use {tool['name']}...{Style.RESET_ALL}",
                        end="",
                        flush=True,
                    )

            # B: Check for Text Content (Streaming Phase)
            if message_chunk.content:
                content = message_chunk.content
                # Handle the list/dictionary structure error
                if isinstance(content, list):
                    text_parts = [
                        part.get("text", "")
                        for part in content
                        if isinstance(part, dict)
                    ]
                    print("".join(text_parts), end="", flush=True)

                else:
                    print(content, end="", flush=True)

        # 2. Handle Tool Messages (Action Phase)
        elif isinstance(message_chunk, ToolMessage):
            tool_name = getattr(message_chunk, "name", "tool")
            print(
                f"\n{Fore.CYAN}[ACTION] Executing {tool_name}!!{Style.RESET_ALL}",
                end="",
                flush=True,
            )


def main():
    while True:
        try:
            user_input = input("You: ").strip()

            if user_input.lower() in ["exit", "quit"]:
                print("Goodbye!")
                break

            if not user_input:
                continue

            print("\nAssistant: ", end="", flush=True)
            output_stream(chatbot, user_input)
            print()

        except KeyboardInterrupt:
            print("\n\nGoodbye!")
            break
        except Exception as e:
            print(f"\nError: {str(e)}")
            print()


if __name__ == "__main__":
    main()
