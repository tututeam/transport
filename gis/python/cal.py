EARTH_REDIUS = 6378.137
import math
from math import sin,cos,pi
def rad(d):
    return d * pi / 180.0

def getDistance(lat1, lng1, lat2, lng2):
    radLat1 = rad(lat1)
    radLat2 = rad(lat2)
    a = radLat1 - radLat2
    b = rad(lng1) - rad(lng2)
    s = 2 * math.asin(math.sqrt(math.pow(sin(a/2), 2) + cos(radLat1) * cos(radLat2) * math.pow(sin(b/2), 2)))
    s = s * EARTH_REDIUS
    print s
    return s
lat=39.8476833
lon=116.3268157
lat1=39.855794547899
lon1=116.32520066635133
getDistance(lat,lon,lat1,lon1)