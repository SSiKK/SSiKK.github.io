import urllib

urlpath = "http://l.yimg.com/a/i/us/we/52/"
urlext = ".gif"
localpath = "C:/Users/Shiwangi/Desktop/CS422/cs422/SSiKK.github.io/js/assets/yahoo-img/"
localext = ".gif"
for i in range(0,48):
	weburl = urlpath + str(i) + urlext
	localurl = localpath + str(i) + localext

	urllib.urlretrieve( weburl , localurl)