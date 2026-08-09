# ===============================
# Feasto Development Commands
# ===============================

.PHONY: customer customer-tree help

help:
	@echo "Available Commands:"
	@echo "  make customer      - Run Customer Web App (Angular)"


# -------------------------------
# Customer Web App (Angular)
# -------------------------------

customer:
	cd customer-web && ng s -o

customer-tree:
	cd customer-web && tree src/app /F

install-customer:
	cd customer-web && npm install