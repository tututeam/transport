from qgis.core import *
# // Reference the JavaScript API from our CDN and you are ready to get started:
  <link rel="stylesheet" href="https://js.arcgis.com/4.9/esri/css/main.css">
  <script src="https://js.arcgis.com/4.9/"></script>supply path to qgis install location
QgsApplication.setPrefixPath("/path/to/qgis/installation", True)

# create a reference to the QgsApplication, setting the
# second argument to False disables the GUI
qgs = QgsApplication([], False)

# load providers
qgs.initQgis()

# Write your code here to load some layers, use processing algorithms, etc.

# When your script is complete, call exitQgis() to remove the provider and
# layer registries from memory
qgs.exitQgis()