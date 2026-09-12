"""A tiny, finite-vocabulary OPD calculation; Python standard library only."""
import math

student = {"check": 0.70, "guess": 0.25, "stop": 0.05}
teacher = {"check": 0.90, "guess": 0.05, "stop": 0.05}

def kl(p, q):
    return sum(v * math.log(v / q[k]) for k, v in p.items() if v)

print("forward KL T||S:", round(kl(teacher, student), 4))
print("reverse KL S||T:", round(kl(student, teacher), 4))
for token in student:
    # Negative cross-entropy gradient with respect to the student logit.
    print(token, "target-minus-current:", round(teacher[token] - student[token], 2))
