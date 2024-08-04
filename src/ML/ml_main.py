import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity

import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
import pymorphy2
import nltk
import re
from gensim import models
import string
nltk.download('punkt')
nltk.download('stopwords')
stop_words = stopwords.words("russian")


def preprocessing(text):
    text = text.lower()
    tokens = word_tokenize(text, language="russian")
    filtered_tokens = []
    snowball = SnowballStemmer(language="russian")
    morph = pymorphy2.MorphAnalyzer()

    for token in tokens:
        if token not in stop_words:
            token = token.strip(string.punctuation)
            token = snowball.stem(morph.parse(token)[0].normal_form)
            if token != '':
                filtered_tokens.append(token)

    return ' '.join(filtered_tokens)


def vectorize_and_rank(input_sentence, sentences, titl):
    # Векторизуем все предложения (включая входное)
    all_sentences = [input_sentence] + sentences
    count_vectorizer = CountVectorizer()
    sentence_vectors = count_vectorizer.fit_transform(all_sentences)

    # Вычисляем косинусное сходство между входным предложением и всеми остальными
    similarities = cosine_similarity(sentence_vectors[0], sentence_vectors[1:]).flatten()

    # Создаем упорядоченный ранжированный список
    ranked_sentences = sorted(list(zip(tuple(titl), similarities)), key=lambda x: x[1], reverse=True)

    return [x[0] for x in ranked_sentences]


def recommendation(sentences, titl):
    similarities = cosine_similarity([sentences[0]], sentences[1:]).flatten()
    # Создаем упорядоченный ранжированный список
    ranked_sentences = sorted(list(zip(titl, similarities)), key=lambda x: x[1], reverse=True)
    return [x[0] for x in ranked_sentences]


#----------------------------------ОБНОВЛЕНИЕ------------------------------------------------------


def parsing_person(path):
    # в data можно поместить словарь с одним пользователем
    # data = pd.read_json(path)
    data = path
    result = ' '
    for i in range(len(data['professions'])):
        result += str(data['professions'][i]['profession_name']) + " "
    result += str(data['about_me'])
    return result


def parsing_objects(path):
    # в data можно поместить словарь с вакансиями
    # data = pd.read_json(path)
    data = path
    result = pd.DataFrame(columns=['0'])
    title = pd.DataFrame(columns=['0'])
    id_lst = pd.DataFrame(columns=['0'])
    for i in range(len(data['objects_constructions'])):
        id_lst.loc[len(id_lst.index)] = data['objects_constructions'][i]['id']
        title.loc[len(title.index)] = data['objects_constructions'][i]['work_name']
        s = ''
        for j in range(len(data['objects_constructions'][i]['professions'])):
            s += data['objects_constructions'][i]['professions'][j]['profession_name'] + " "
        result.loc[len(result.index)] = str(data['objects_constructions'][i]['work_name']).lower() + " " + s + str(data['objects_constructions'][i]['work_description']).lower()
    dt = pd.DataFrame({'id': id_lst['0'].tolist(), 'title': title['0'].tolist(), 'vacancy': result['0'].tolist()})
    return dt


def back_to_back(lst, path):
    # повторно считываю весь словарь профессий, его можно напрямую в data сюда передать
    # data = pd.read_json(path)
    data = path
    res = {'objects_constructions': []}
    for el in lst:
        for c in range(len(data['objects_constructions'])):
            if data['objects_constructions'][c]['id'] == el:
                res['objects_constructions'].append(data['objects_constructions'][c])
                break
    return res


# Вот здесь в input_sentence загоняешь сторку формата "название_профессии краткое_описание"


# эту не меняешь, здесь все вакансии, среди которых будет поиск (ну либо меняешь, но в том же формате)



