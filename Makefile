# ===============================
# Feasto Development Commands
# ===============================

.PHONY: customer help

help:
	@echo "Available Commands:"
	@echo "  make customer      - Run Customer Web App (Angular)"


# -------------------------------
# Customer Web App (Angular)
# -------------------------------

customer:
	cd customer-web && ng s -o

install-customer:
	cd customer-web && npm install