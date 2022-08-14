# 获取 API 可自行搭建 https://github.com/Oblatum/App-Tracker-for-Icon-Pack-Server-Side
API?=http://localhost:8080

build:
	env VITE_APP_API_URL=${API} npm run build

lint:
	npm run lint

clean:
	rm -rf dist/

dev:
	npm run dev