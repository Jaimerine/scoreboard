APP_NAME ?= scoreboard

# build client for development
.PHONY: client
client: .add_modules_client
	cd client; npm run dev
	@echo "Client for $(APP_NAME) is built for development"

# build server for development
.PHONY: server
server: .add_modules_server
	server/node_modules/.bin/nodemon nodemon server/app.js
	@echo "Server for $(APP_NAME) is built for development"

# remove node dependencies
.PHONY: clean
clean: .remove_modules
	@echo "Removing node modules."

.remove_modules:
	rm -rf server/node_modules | rm -rf client/node_modules

# add node dependencies
.PHONY: install
install: .add_modules_client .add_modules_server
	@echo "Installing node modules."

.add_modules_client:
	cd client; npm install

.add_modules_server:
	cd server; npm install

.kill_servers:
	#a=$(pgrep -f node); kill -9 $a
	#taskkill /F /IM node.exe

# run the application in a development context
.PHONY: up
up: client server

# stop the running application
.PHONY: down
down: .kill_servers
