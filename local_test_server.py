import http.server, signal
from http.server import HTTPServer, BaseHTTPRequestHandler
import socketserver

def run_test_server():
    PORT = 8081

    Handler = http.server.SimpleHTTPRequestHandler

    Handler.extensions_map={
            '.manifest': 'text/cache-manifest',
            '.html': 'text/html',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.avif': 'image/avif',
            '.svg': 'image/svg+xml',
            '.css': 'text/css',
            '.js': 'application/x-javascript',
            '': 'application/octet-stream', # Default
        }

    global server
    server = socketserver.TCPServer(("", PORT), Handler)

    print("serving at port", PORT)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    server.server_close()

if __name__ == '__main__':
    run_test_server()
