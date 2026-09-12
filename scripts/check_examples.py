"""Run every standalone teaching example; propagate failures to local checks and CI."""
from pathlib import Path
import subprocess
import sys

root = Path(__file__).resolve().parents[1]
examples = sorted((root / "examples").glob("*/*.py"))
if not examples:
    raise SystemExit("No teaching examples found")
for example in examples:
    result = subprocess.run(
        [sys.executable, "-B", str(example)], cwd=root,
        capture_output=True, text=True, timeout=30,
    )
    if result.returncode:
        print(result.stdout)
        print(result.stderr, file=sys.stderr)
        raise SystemExit(f"FAIL {example.relative_to(root)}")
    print(f"PASS {example.relative_to(root)}")
print(f"{len(examples)} examples completed")
