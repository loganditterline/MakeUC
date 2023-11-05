import pickle
import random
import re
import time
from dataclasses import dataclass
from typing import List

import openai

openai.api_key = "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"

@dataclass
class Question:
    prompt: str
    answers: List[str]
    explanation: str
    correct: str
    reports: int
    views: int
    def __init__(self):
        self.reports = 0
        self.views = 0
def createQuestion(questionType):
    question = questionType
    prompt = ""
    if question == "math":
        domains = {
            'Algebra': [
                'Linear equations in one variable',
                'Linear functions',
                'Linear equations in two variables',
                'Systems of two linear equations in two variables',
                'Linear inequalities in one or two variables'
            ],
            'Advanced Math': [
                'Nonlinear functions',
                'Nonlinear equations in one variable and systems of equations in two variables',
                'Equivalent expressions'
            ],
            'Problem-Solving and Data Analysis': [
                'Ratios, rates, proportional relationships, and units',
                'Percentages',
                'One-variable data: Distributions and measures of center and spread',
                'Two-variable data: Models and scatterplots',
                'Probability and conditional probability',
                'Inference from sample statistics and margin of error',
                'Evaluating statistical claims: Observational studies and experiments'
            ],
            'Geometry and Trigonometry': [
                'Area and volume',
                'Lines, angles, and triangles',
                'Right triangles and trigonometry',
                'Circles'
            ]
        }
        random_domain = random.choice(list(domains.keys()))
        random_skill = random.choice(list(domains[random_domain]))
        prompt = "Generate a math SAT example question that uses " + f"{random_domain} and {random_skill} "+  "in the following format:\n\nQuestion: {question}.\n\nA) {choice_a}\nB) {choice_b}\nC) {choice_c}\nD) {choice_d}\n\nCorrect answer: {correct_answer}\n\nJustification: {justification_steps}. Therefore, the correct answer is {correct_value}."
    else:
        domain = {
            'Information and Ideas': [
                'Central Ideas and Details',
                'Inferences',
                'Command of Evidence'
            ],
            'Craft and Structure': [
                'Words in Context',
                'Text Structure and Purpose',
                'Cross-Text Connections'
            ],
            'Expression of Ideas': [
                'Rhetorical Synthesis',
                'Transitions'
            ],
            'Standard English Conventions': [
                'Boundaries',
                'Form, Structure, and Sense'
            ]
        }
        random_domain = random.choice(list(domains.keys()))
        random_skill = random.choice(list(domains[random_domain]))
        prompt = "Generate a reading and writing SAT example question that uses " + f"{random_domain} and {random_skill} "+  "in the following format:\n\nQuestion: {question}.\n\nA) {choice_a}\nB) {choice_b}\nC) {choice_c}\nD) {choice_d}\n\nCorrect answer: {correct_answer}\n\nJustification: {justification_steps}. Therefore, the correct answer is {correct_value}."
    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt="Generate a " + question + " SAT example question in the following format:\n\nQuestion: {question}.\n\nA) {choice_a}\nB) {choice_b}\nC) {choice_c}\nD) {choice_d}\n\nCorrect answer: {correct_answer}\n\nJustification: {justification_steps}. Therefore, the correct answer is {correct_value}.",
        max_tokens=800
    )
    text = response.choices[0].text
    print(text)
    parsed = [y for y in text.split('\n') if y != '']
    prompt = f"<p>{parsed.pop(0)[10:]}</p"
    answers = [f"<p>{parsed.pop(0)[3:]}</p" for i in range(4)]
    correct = f"<p>{parsed.pop(0)[16:17]}</p"
    explanation = f"<p>{parsed.pop(0)[15:]}"
    while len(parsed) != 0:
        explanation += " " + parsed.pop(0)
    explanation += "</p>"

    q = Question()
    q.prompt = prompt
    q.answers = answers
    q.correct = correct
    q.explanation = explanation
    return q

def toPickle(amount, type, filename, sleepTime):
    ai_generated_questions_list = []
    for i in range(amount):
        a = createQuestion("type")
        ai_generated_questions_list.append(a)
        time.sleep(sleepTime)
    with open(filename, 'wb') as file:
        pickle.dump(ai_generated_questions_list, file)
        
        
if __name__ == "__main__":
   
#    amount = 100
#    type = "math"
#    filename = "ai_generate_questions.pkl"
#    sleepTime = 0
#    toPickle(amount, type, filename, sleepTime)
   
   
    # with open('test.pkl', 'rb') as file:
    # # Deserialize and load the object(s) from the file
    #     loaded_data = pickle.load(file)
    loaded_data = []
    for i in range(20):
        a = createQuestion("writing")
        loaded_data.append(a)
        
    for question in loaded_data:
        print(question.prompt)
        print(question.answers)
        print(question.correct)
        print(question.explanation)
