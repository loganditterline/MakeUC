import requests

from question import Question, convert_metadata_to_questions

# external_id_mode is either true or false
# this stems from the design decisions of college board
def get_question(question_id, external_id_mode):
    if external_id_mode:
        url = 'https://reporting-api.collegeboard.org/msreportingquestionbank-prod/questionbank/digital/get-question'
        data = {
            'external_id': question_id,
        }
        response = requests.post(url, json=data, headers={'Content-Type': 'application/json'})
        response_json = response.json()

        q = Question()
        q.prompt = response_json['stem'].strip()
        q.answers = []
        for elem_json in response_json['answerOptions']:
            q.answers.append(elem_json['content'])
        if q.answers == []: # not an MC
            return None
        q.correct = response_json['correct_answer'][0]
        q.explanation = response_json['rationale']
        return q
    else:
        # we use get
        url = f'https://data-sat-origin.collegeboard.org/api/v1/views/assessment.json?args[0]={question_id}&args[1]=211'
        response = requests.get(url)
        response_json = response.json()[0]

        q = Question()
        q.prompt = response_json['prompt'].strip()
        answer_info = response_json['answer']
        if not 'choices' in answer_info.keys(): # it's not MC question
            return None
        answers = answer_info['choices']
        q.answers = []
        q.answers.append(answers['a']['body'].strip())
        q.answers.append(answers['b']['body'].strip())
        q.answers.append(answers['c']['body'].strip())
        q.answers.append(answers['d']['body'].strip())
        q.correct = answer_info['correct_choice'].strip()
        q.explanation = answer_info['rationale'].strip()
        return q

if __name__ == '__main__':
    convert_metadata_to_questions('math')
    # q = get_question('022222-DC', False) # MC example
    # q = get_question('070615-DC', False) # non-MC example
    # q = get_question('07aee0d5-9ae6-4612-bbac-cad96d3eb3dd', True) # MC example
    # q = get_question('83c4d031-e8f1-4415-8c6c-33d11d65e85b', True) # non-MC example