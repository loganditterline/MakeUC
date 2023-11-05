# writes the question metadata for math to our mongodb
# this code is only meant to be called once, useful in case we corrupt our db

from mongo import get_collection
from question import get_metadata

# type is either math or reading_writing
def write_metadata(type):
    metadata = get_metadata(type)
    collection = get_collection('QuestionData', f'{type}_metadata')
    collection.insert_many(metadata)

if __name__ == '__main__':
    write_metadata('reading_writing')