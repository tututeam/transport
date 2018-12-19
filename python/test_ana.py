import numpy
import matplotlib.pyplot as plt
with open('b.txt','r',encoding='utf8') as f:
    lines=f.readlines()
    a=float(lines[0].split(' ')[0].strip(' ').strip('\n'))
    b=float(lines[0].split(' ')[1].strip(' ').strip('\n'))
    for i in lines:
        lng=float(i.split(' ')[0].strip(' ').strip('\n'))
        lat=float(i.split(' ')[1].strip(' ').strip('\n'))
        print(lng,lat)
        plt.scatter(lng-a,lat-b)
plt.show()