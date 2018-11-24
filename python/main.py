import osmapi
api = osmapi.OsmApi()
print(api.NodeGet(123))
lat=39.8476834
lon=116.3268157
lat1= 39.8524116
lon1 = 116.3147947
print(api.Map(lon1,lat,lon,lat1))

# {u'changeset': 532907, u'uid': 14298,
# u'timestamp': u'2007-09-29T09:19:17Z',
# u'lon': 10.790009299999999, u'visible': True,
# u'version': 1, u'user': u'Mede',
# u'lat': 59.9503044, u'tag': {}, u'id': 123}