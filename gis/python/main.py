import numpy
import matplotlib.pyplot as plt
import json

point_arr = []
with open('../data/print.txt', 'r', encoding='utf8') as f:
    lines = f.readlines()
    a = float(lines[0].split(' ')[0].strip(' ').strip('\n'))
    b = float(lines[0].split(' ')[1].strip(' ').strip('\n'))
    for i in lines:
        lng = float(i.split(' ')[0].strip(' ').strip('\n'))
        lat = float(i.split(' ')[1].strip(' ').strip('\n'))
        point_arr.append({'lng': str(lng), 'lat': str(lat)})
with open('../data/b.json', 'a') as f1:

    f1.write(json.dumps(point_arr))
