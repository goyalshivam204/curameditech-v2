
def topNProbs(probs,model,n):
    labels = model.classes_
    probs_class = [0]*len(labels)
    for i in range(0, len(labels)):
        probs_class[i] = (round(probs[i],2), labels[i])

    return sorted(probs_class)[:-(n+1):-1]
