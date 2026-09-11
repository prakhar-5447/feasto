# ===============================
# Feasto Development Commands
# ===============================

.PHONY: help \
	customer customer-local customer-tree install-customer \
	restaurant restaurant-local restaurant-tree install-restaurant

help:
	@echo "Available Commands:"
	@echo ""
	@echo "Customer Web App (Angular):"
	@echo "  make customer             - Run Customer Web App"
	@echo "  make customer-local       - Run Customer Web App on local network"
	@echo "  make customer-tree        - Show Customer Web App source tree"
	@echo "  make install-customer     - Install Customer Web App dependencies"
	@echo ""
	@echo "Restaurant Partner Web App (Next.js):"
	@echo "  make restaurant           - Run Restaurant Partner Web App"
	@echo "  make restaurant-local     - Run Restaurant Partner Web App on local network"
	@echo "  make restaurant-tree      - Show Restaurant Partner Web App source tree"
	@echo "  make install-restaurant   - Install Restaurant Partner Web App dependencies"


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


# -------------------------------
# Restaurant Partner Web App
# (Next.js)
# -------------------------------

restaurant:
	cd restaurant-web && npm run dev

restaurant-local:
	cd restaurant-web && npm run dev -- --hostname 0.0.0.0

restaurant-tree:
	cd restaurant-web && tree src /F

install-restaurant:
	cd restaurant-web && npm install