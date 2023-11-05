# writes the question metadata for math to our mongodb
# this code is only meant to be called once, useful in case we corrupt our db

from mongo import get_collection
from questions.math_questions import get_metadata

metadata = get_metadata()
collection = get_collection('QuestionData', 'math_metadata')

collection.insert_many(metadata)