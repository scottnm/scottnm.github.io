# Scrapewood

*Scrapewood* is an e-book collection that I assembled of the [*Achewood*](https://achewood.com/) webcomic series by Chris Onstad. None of the content of the e-book is my own (all credit to Onstad), but I did a significant amount of work collecting and assembling that source material into something that I could read on an e-reader, and that resulting e-book is *Scrapewood*.

![A page of the Scrapewood e-book rendered on a kobo e-reader](/site_images/scrapewood_on_reader.avif)

If you're not familiar with *Achewood*, this post isn't the right venue for me to explain it to you. The only context you need to understand the rest of this post is that...

1. I like *Achewood* quite a bit.
2. The [Achewood website](https://achewood.com/) is *really* the only place you can read the comic without spending hundreds of dollars for copies of older print collections.
3. Reading *Achewood* from a mobile device is not a pleasant experience (or at least it wasn't for me the last time I tried back in 2021).

I wanted a nicer way to read *Achewood*, and since it hasn't been formally published for e-books yet, I set out to fill that need for myself.

I wrote a web scraper in [Rust](https://www.rust-lang.org/)[1] to crawl the *Achewood* site and download all of the comics from all of the major *Achewood* story arcs. The comics were all downloaded in their original format: tiny GIFs (this webcomic started in the early 2000s. It was a different time!)

My first attempt to make the comics e-reader compatible was just to generate a PDF where each page was a different comic. There were probably smarter ways to do this, but how I ended up doing this was by selecting all of the files on my PC and running them collectively through Window's "Print as PDF" functionality. It worked... *ok*..., but a bunch of manual editing and oversight was needed[2] and since the original images were small, there were pretty bad rendering artifacts when the e-reader would try to expand the image to fill the screen.

So, next, I ran all of source images through an AI upscaler to deal with those rendering artifacts. Honestly, I don't remember much about this part of the process (I'm writing this in 2024 when I originally did most of this work back in 2021). I have been able to dig up that I used [BigJPG](https://bigjpg.com/) as my upscaler and I think I have some memory of writing scripts to automate some parts of the process for me, but I can't seem to find any of those old scripts.

With all of the comics HD-ified, I constructed another PDF with the same ugly manual process, and that worked ok for quite a while. PDFs are always a bit awkward to read on an e-reader since the e-reader can't make smart decisions about how to layout the content. So, you end up with awkwardly small text and an interface that has to support zooming which is usually pretty terrible on e-ink e-readers.

Near the end of 2022, I finally had enough and took the plunge to redo *Scrapewood* (yet again) but this time in EPUB format which my e-reader works best with. Figuring out how to format this as an EPUB was a really interesting process. EPUB is a well-enough documented format, but rather than read a spec I took the lazy/fun path and sort of reverse engineered the whole thing. Once I discovered[3] that an EPUB is really just a zip archive of some XHTML files and other assets (e.g. image files), it was almost faster to just extract the contents from a working EPUB file and work my way backwards to creating my own. Sometimes, it's easier to iterate with something that's already working than to read a long spec full of information that isn't relevant to the task at hand. Ultimately, I ended up being able to generate the whole e-book from a collection of template XHTML files that I worked out by example and a <300 line PowerShell script. How cool! No fancy tools needed here, no sir!

And that's it. I've read through *Achewood* in full about 4 times and 2 of those times were using my own *Scrapewood* e-book. To me, that's a very satisfying experience and I'm happy I took the time to write about the process.

## Source?

Unlike most of my projects, I'm not sharing much of what I actually built (the PDFs and EPUBs) or the source code of the tools I used to build it (e.g. the web scraper and EPUB generator script).

This is intentional.

While *Achewood* is free to read online, it's not my property to redistribute in other forms. If you're looking for a fun project, I've outlined how you could do this yourself (and hopefully helped you avoid my own missteps), but that's as far as I'll go.

## Footnotes

[1] Why Rust? No reason other than I wanted an excuse to write some Rust.
[2] I do not understand why, but, sometimes, Windows would print some comics rotated and other times not and it took a look of fiddling around in the PDF options to coax Windows to generate the PDF semi-correctly.
[3] By "discovered", I mean that I tried to open an EPUB file in Vim hoping that it was somehow just a plaintext file and was surprised to see Vim trying to read it like a ZIP archive (which Vim has native functionality for browsing).