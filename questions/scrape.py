import requests

def get_questions():
    url = 'https://reporting-api.collegeboard.org/msreportingquestionbank-prod/questionbank/digital/get-questions'
    # NOTE this structure of sending data is not yet fully flushed out
    data = {
        'asmtEventId': 99,
        'domain': 'H,P,Q,S',
        'test': 2
    }

    response = requests.post(url, json=data, headers={'Content-Type': 'application/json'})

    if response.status_code == 200:
        return response.json()
    else:
        print('POST request failed with status code:', response.status_code)
