
class HttpRouter:
	def handle_http_request(self, http_request: str):
		method, resource, *request = http_request.split(' ', 2)

		if method == 'GET':
			if resource == '/':
				... # handle / GET request
			elif resource == '/home':
				... # handle /home GET Request
			# ...
		if method == 'POST':
			if resource == '/api/login':
				... # handle POST /api/login
			elif resource == '/api/profile':
				... # handle POST /api/profile
		#...



http_router = HttpRouter()

http_router.handle_http_request("GET / HTTP/1.1\nHost localhost\n...")
http_router.handle_http_request("GET /home HTTP/1.1\n...")
http_router.handle_http_request("POST /api/login HTTP/1.1\n...")
http_router.handle_http_request("POST /api/profile HTTP/1.1\n...")
