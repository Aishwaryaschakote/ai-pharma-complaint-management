from langgraph.graph import StateGraph, END # type: ignore

from app.langgraph.state import ComplaintState
from app.langgraph.nodes import (
    extract_node,
    completeness_node,
    risk_node,
    duplicate_node,
    recommendation_node,
)

builder = StateGraph(ComplaintState)

builder.add_node("extract", extract_node)
builder.add_node("completeness", completeness_node)
builder.add_node("risk", risk_node)
builder.add_node("duplicate", duplicate_node)
builder.add_node("recommendation", recommendation_node)

builder.set_entry_point("extract")

builder.add_edge("extract", "completeness")
builder.add_edge("completeness", "risk")
builder.add_edge("risk", "duplicate")
builder.add_edge("duplicate", "recommendation")
builder.add_edge("recommendation", END)

graph = builder.compile()