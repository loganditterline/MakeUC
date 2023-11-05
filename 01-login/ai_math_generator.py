import pickle
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
    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt="Generate a math SAT example question for " + question + " in the following format:\n\nQuestion: {question}.\n\nA) {choice_a}\nB) {choice_b}\nC) {choice_c}\nD) {choice_d}\n\nCorrect answer: {correct_answer}\n\nJustification: {justification_steps}. Therefore, the correct answer is {correct_value}.",
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
   
   amount = 100
   type = "math"
   filename = "ai_generate_questions.pkl"
   sleepTime = 0
   toPickle(amount, type, filename, sleepTime)
   
   
    # with open('test.pkl', 'rb') as file:
    # # Deserialize and load the object(s) from the file
    #     loaded_data = pickle.load(file)
    
    # for question in loaded_data:
    #     print(question.prompt)
    #     print(question.answers)
    #     print(question.correct)
    #     print(question.explanation)
