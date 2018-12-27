import os
import matplotlib.pyplot as plt
import numpy as np

point_arr = []

total = {}

with open('print.txt', 'r', encoding='utf8') as f:
    lines = f.readlines()
    c = 0
    for line in lines:
        if "开始" in line and point_arr != []:
            total[c] = point_arr
            point_arr = []
        if "纬度" in line:
            acc = lines[c + 2][3:].strip('\n')
            acc = float(acc)
            if acc > 5:
                c += 1
                continue
            lng = line[3:].strip('\n')
            # print(lng)
            lat = lines[c + 1][3:].strip('\n')
            # print(lat)
            # point_arr.append({'lng': float(lng), 'lat': float(lat)})
            point_arr.append([float(lng), float(lat)])
        c += 1

if point_arr != []:
    total[c] = point_arr


def calcul_S(points):
    K = 9101160000.085981

    def hl(p1, p2):
        return p1[0] * p2[1] - p1[1] * p2[0]

    if len(points) < 3:
        return 0

    S_2 = 0
    num_point = len(points) - 1
    for i in range(num_point):
        S_2 += hl(points[i], points[i + 1])
    S_2 -= hl(points[0], points[-1])
    return abs(S_2 / 2) * K


def plot_it(data):
    x = np.asarray([d[0] for d in data])
    y = np.asarray([d[1] for d in data])
    x = x - np.mean(x)
    y = y - np.mean(y)
    plt.scatter(x=x, y=y)
    plt.show()


for key in total:
    plot_it(total[key])
    print(calcul_S(total[key]))
