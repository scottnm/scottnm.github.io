import argparse
import http.server
import socketserver

def run_test_server(port) -> None:
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
    server = socketserver.TCPServer(("", port), Handler)

    print("serving at port", port)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    server.server_close()

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-p", "--port", default=8081, type=int)
    args = parser.parse_args()
    run_test_server(args.port)

if __name__ == '__main__':
    main()
