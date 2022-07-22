# broughlike

brough bruh!

https://nluqo.github.io/broughlike-tutorial/stage1.html

https://nluqo.github.io/broughlike-tutorial/stage2.html

https://nluqo.github.io/broughlike-tutorial/stage3.html

sprites by Oryx Design Lab at www.oryxdesignlab.com

interesting problem - I want to use jest for unit testing BUT I also want
the game to run from the index.html file without issues. Since jest doesn't
reference the html file, it doesn't have access to all the files.
I'm solving this (for now) by adding require statements as needed for unit testing, then using the create_release bash script to remove said references for release. This should give me some flexibility, but will probably cause problems down the road.
