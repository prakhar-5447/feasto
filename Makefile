# ===============================
# Feasto Development Commands
# ===============================

.PHONY: customer customer-local customer-tree help

help:
	@echo "Available Commands:"
	@echo "  make customer      - Run Customer Web App (Angular)"


# -------------------------------
# Customer Web App (Angular)
# -------------------------------

customer:
	cd customer-web && ng s -o

customer-local:
	cd customer-web && ng serve --open --host 0.0.0.0

customer-tree:
	cd customer-web && tree src/app /F

install-customer:
	cd customer-web && npm install