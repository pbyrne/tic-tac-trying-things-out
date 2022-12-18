.PHONY: build
build: node_modules
	npm run build

.PHONY: serve
serve: node_modules
	npm run serve

.PHONY: clean
clean: node_modules
	npm run clean

.PHONY: test
test: node_modules
	npm run test

node_modules: package.json package-lock.json
	npm install
	touch node_modules


