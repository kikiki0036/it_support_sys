import pythainlp
import numpy


def tokenize(sentence):
    return pythainlp.word_tokenize(sentence)

def bow(word,allword):
    # print(word)
    # print(allword)
    bag =numpy.zeros(len(allword))
    # print(bag)
    for i,j in enumerate(allword):
        if j in word:
            bag[i]=1
    return bag