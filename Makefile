.PHONY: test

test:
	@./node_modules/.bin/mocha -u bdd -w --reporter min
