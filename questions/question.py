from dataclasses import asdict, dataclass
import requests
from typing import List

from mongo import get_collection

@dataclass
class Question:
    text: str # background text for reading questions mostly
    prompt: str
    answers: List[str]
    explanation: str
    correct: str
    reports: int
    views: int
    domain: str
    skill: str
    def __init__(self):
        self.text = ''
        self.reports = 0
        self.views = 0

# type is either math or reading_writing
def get_metadata(type):
    url = 'https://reporting-api.collegeboard.org/msreportingquestionbank-prod/questionbank/digital/get-questions'
    # NOTE this structure of sending data is not yet fully flushed out
    if type == 'math':
        data = {
            'asmtEventId': 99,
            'domain': 'H,P,Q,S', # probably something to do with which category (algebra, geometry, etc.)
            'test': 2 # probably something to do with reading vs math section of SAT
        }
    else:
        data = {
            'asmtEventId': 99,
            'domain': 'INI,CAS,EOI,SEC',
            'test': 1
        }

    response = requests.post(url, json=data, headers={'Content-Type': 'application/json'})

    if response.status_code == 200:
        return response.json()
    else:
        print('POST request failed with status code:', response.status_code)

# uses metadata in mongodb to push to our actual questions database
# type is either math or reading_writing
def convert_metadata_to_questions(type):
    questions_metadata = get_collection('QuestionData', f'{type}_metadata')
    questions_collection = get_collection('QuestionData', f'{type}_questions')
    cursor = questions_metadata.find()
    questions = []
    total_count = 0
    if type == 'math':
        from math_questions import get_question
        for document in cursor:
            if document['external_id']:
                question_id = document['external_id']
                external_id_mode = True
            else:
                question_id = document['ibn']
                external_id_mode = False
            try:
                q = get_question(question_id, external_id_mode)
                q.domain = document['primary_class_cd_desc']
                q.skill = document['skill_desc']
                if q:
                    questions.append(asdict(q))
            except:
                pass
            total_count += 1
            print(len(questions), 'successfully converted of', total_count)
    else:
        from reading_writing_questions import get_question
        for document in cursor:
            question_id = document['external_id']
            try:
                q = get_question(question_id)
                q.domain = document['primary_class_cd_desc']
                q.skill = document['skill_desc']
                if q:
                    questions.append(asdict(q))
            except:
                pass
            total_count += 1
            print(len(questions), 'successfully converted of', total_count)
    questions_collection.insert_many(questions)

# questions should be dicts, type is ai_math, math, ai_reading_writing, reading_writing
def write_questions(type, questions):
    questions_collection = get_collection('QuestionData', f'{type}_questions')
    questions_collection.insert_many(questions)