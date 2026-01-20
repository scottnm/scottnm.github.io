"VTPP" (for "Video-to-Private-Podcast) is a Raspberry Pi application with two main components:

1. a "fetcher" which downloads videos from external sources(s)[^1] and extracts their audio.
2. a database of these downloads which is dynamically served as a podcast feed.

Together, this enables me to automatically generate a podcast feed of audio from the latest videos of a select handful of youtube channels.

<img alt="VTPP feed in podcast app and episode being played" src="/site_images/demo_podcast.avif" style="display: block; margin-left: auto; margin-right: auto; max-width: 100%" >

For me it's been surprisingly useful!

I'm not yet interested in publishing the source for anyone else to use because:

1. I haven't built it for anyone else to use so it's still held up with metaphorical scotch date and paperclips in some places that I don't think would be pleasant for anyone to use
2. The source isn't "good enough" to warrant reading even for educational purposes
3. The source really isn't that interesting. It's mostly a wrapper around sqlite and youtube-dl, just packaged in a UX that works for me.

Nevertheless I'm proud of it.

Here's a list of all the updates and milestones I've felt warranted writing about:

I haven't made any updates in a few years, but just in case the sun ever shines on this codebase again, I'll keep a log of all past and future updates here: 

* [v0.3.0 milestone](/pages/vtpp/0.3.0/2026_01_19_vtpp_0.3.0.html)
* [v0.2.0 milestone](/pages/vtpp/0.2.0/2023_12_13_vtpp_0.2.0.html) 
* [v0.1.0 milestone](/pages/vtpp/0.1.0/2023_11_04_vtpp_0.1.0.html) 

[^1]: Today, the only real supported source is YouTube, but supporing other feed sources would be desirable future improvements.