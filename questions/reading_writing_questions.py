import requests

from question import convert_metadata_to_questions, Question

def get_question(question_id):
    url = 'https://reporting-api.collegeboard.org/msreportingquestionbank-prod/questionbank/digital/get-question'
    data = {
        'external_id': question_id,
    }
    response = requests.post(url, json=data, headers={'Content-Type': 'application/json'})
    response_json = response.json()

    q = Question()
    q.text = response_json['stimulus'].strip()
    q.prompt = response_json['stem'].strip()
    q.answers = []
    for elem_json in response_json['answerOptions']:
        q.answers.append(elem_json['content'])
    q.correct = response_json['correct_answer'][0]
    q.explanation = response_json['rationale']
    return q

if __name__ == '__main__':
    convert_metadata_to_questions('reading_writing')