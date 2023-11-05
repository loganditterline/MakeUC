import pickle
from dataclasses import asdict

from question import write_questions
from question import Question as Q

# type should be ai_reading_writing or ai_math
def write_ai_questions(type):
    with open(f'{type}.pkl', 'rb') as f:
        ai_qs = pickle.load(f)
        print(len(ai_qs))
        qs = []
        for q in ai_qs:
            q.correct = q.correct[3] # since we store correct for ai qs in html tag
            qs.append(asdict(q))
        write_questions(type, qs)

if __name__ == '__main__':
    write_ai_questions('ai_reading_writing')

'''
with open('ai_reading_and_writing_questions.pkl', 'rb') as f:
    ai_reading_writing = pickle.load(f)
    print(ai_reading_writing)
    qs = []
    for old_q in ai_reading_writing:
        new_q = Q()
        new_q.text = ''
        new_q.prompt = old_q.prompt
        new_q.answers = old_q.answers
        new_q.correct = old_q.correct
        new_q.explanation = old_q.explanation
        new_q.domain = old_q.domain
        new_q.skill = old_q.skill
        qs.append(new_q)
    with open('ai_reading_writing.pkl', 'wb') as fo:
        pickle.dump(qs, fo)
'''