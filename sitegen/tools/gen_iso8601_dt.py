#!/usr/bin/env python3
import datetime

dt = datetime.datetime.now()
dt_str = dt.isoformat()
print(f"""\
"pub_datetime": "{dt_str}",
"lastupdate_datetime": "{dt_str}",\
""")