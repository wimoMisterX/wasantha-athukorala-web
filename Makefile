PORT = 3000
SPSERVER = node_modules/spserver/bin.js

runserver:
	$(SPSERVER) -f assets/index.html -s dist -p $(PORT)
