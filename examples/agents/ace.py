"""A deterministic miniature of ACE's curator, not an LLM implementation."""
from dataclasses import dataclass

@dataclass
class Rule:
    text: str
    helpful: int = 0
    harmful: int = 0

playbook = {"units": Rule("先确认币种和最小单位", helpful=1)}
reflections = [("units", "先确认币种和最小单位", True),
               ("scope", "只在接口元数据缺失时询问单位", True),
               ("units", "先确认币种和最小单位", False)]

for key, text, worked in reflections:       # deterministic merge by stable key
    rule = playbook.setdefault(key, Rule(text))
    rule.helpful += int(worked)
    rule.harmful += int(not worked)
for key in sorted(playbook):
    rule = playbook[key]
    print(f"{key}: +{rule.helpful} -{rule.harmful} | {rule.text}")
