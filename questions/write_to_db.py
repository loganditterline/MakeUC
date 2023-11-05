# writes the question metadata to our mongodb
# this code is only meant to be called once, useful in case we corrupt our db

from mongo import get_collection
from scrape import get_questions

questions = get_questions()
collection = get_collection('QuestionData', 'questions')

collection.insert_many(questions)