import typing
import contextlib
import time
import logging
import sys

@contextlib.contextmanager
def time_section(section_title: str):
    time_start = time.perf_counter()
    try:
        yield  # Code before yield is __enter__, after yield is __exit__
    finally:
        time_end = time.perf_counter()
        logging.info("%s time %.6f seconds", 
            section_title, 
            time_end - time_start)

def fatal_error(fmt_string: str, *fmt_args) -> typing.NoReturn:
    logging.error(fmt_string, *fmt_args)
    sys.exit(1)

class GenLoggingFormatter(logging.Formatter):

    darkgrey = "\x1b[33;90m"
    grey = "\x1b[38;20m"
    yellow = "\x1b[33;20m"
    red = "\x1b[31;20m"
    bold_red = "\x1b[31;1m"

    @staticmethod
    def make_formatter(color_str) -> logging.Formatter:
        format_str = '\x1b[33;90m[%(asctime)s.%(msecs)03d]\x1b[0m %(levelname)s: %(message)s'
        reset = "\x1b[0m"
        return logging.Formatter(
            color_str + format_str + reset,
            datefmt='%H:%M:%S'
            )

    FORMATTERS = {
        logging.DEBUG: make_formatter(darkgrey),
        logging.INFO: make_formatter(""),
        logging.WARNING: make_formatter(yellow),
        logging.ERROR: make_formatter(red),
        logging.CRITICAL: make_formatter(bold_red),
    }

    def format(self, record):
        formatter = self.FORMATTERS.get(record.levelno)
        return formatter.format(record)

def setup_logger(log_verbose: bool):
    log_level = logging.DEBUG if log_verbose else logging.INFO

    log_handler = logging.StreamHandler()
    log_handler.setLevel(log_level)
    log_handler.setFormatter(GenLoggingFormatter())

    logger = logging.getLogger()
    logger.setLevel(log_level)
    logger.addHandler(log_handler)