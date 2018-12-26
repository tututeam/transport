import numpy
import matplotlib.pyplot as plt
import json

point_arr = []
with open('../data/print.txt', 'r', encoding='utf8') as f:
    lines = f.readlines()
    c=0
    for line in lines:
        if "纬度" in line:
            acc = lines[c+2][3:].strip('\n')
            acc = float(acc)
            if acc >4:
                c+=1
                continue
            lng=line[3:].strip('\n')
            print(lng)
            lat=lines[c+1][3:].strip('\n')
            print(lat)
            point_arr.append({'lng': str(lng), 'lat': str(lat)})
        c+=1

with open('../data/p.json', 'w') as f1:

    f1.write(json.dumps(point_arr))
