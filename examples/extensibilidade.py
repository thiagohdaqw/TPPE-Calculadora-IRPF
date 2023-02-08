from typing import Callable, Tuple


class HttpRouter:
	routes: dict[Tuple[str, str], Callable]
	
	def __init__(self):
		self.routes = {}

	def register_route(self, method: str, resource: str, callback: Callable):
		self.routes[(method, resource)] = callback

	def handle_http_request(self, http_request: str):
		method, resource, *request = http_request.split(' ', 2)
		
		if (method, resource) in self.routes:
			self.routes[(method, resource)](request)

def handle_get_root(request):
	...

def handle_get_home(request):
	...

def handle_post_login(request):
	...
def handle_post_profile(request):
	...

http_router = HttpRouter()

# Registering routes
http_router.register_route('GET', '/', handle_get_root)
http_router.register_route('GET', '/home', handle_get_home)
http_router.register_route('POST', '/api/login', handle_post_login)
http_router.register_route('GET', '/api/profile', handle_post_profile)


# Handling requests
http_router.handle_http_request("GET / HTTP/1.1\nHost localhost\n...")
http_router.handle_http_request("GET /home HTTP/1.1\n...")
http_router.handle_http_request("POST /api/login HTTP/1.1\n...")
http_router.handle_http_request("POST /api/profile HTTP/1.1\n...")
