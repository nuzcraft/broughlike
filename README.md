# broughlike

brough bruh!

https://nluqo.github.io/broughlike-tutorial/stage1.html

https://nluqo.github.io/broughlike-tutorial/stage2.html

https://nluqo.github.io/broughlike-tutorial/stage3.html

https://nluqo.github.io/broughlike-tutorial/stage4.html

https://nluqo.github.io/broughlike-tutorial/stage5.html

https://nluqo.github.io/broughlike-tutorial/stage6.html

https://nluqo.github.io/broughlike-tutorial/stage7.html

sprites by Oryx Design Lab at www.oryxdesignlab.com

interesting problem - I want to use jest for unit testing BUT I also want
the game to run from the index.html file without issues. Since jest doesn't
reference the html file, it doesn't have access to all the files.
I'm solving this (for now) by adding require statements as needed for unit testing, then using the create_release bash script to remove said references for release. This should give me some flexibility, but will probably cause problems down the road.

## Functions to Unit Test

### game.js

1. getSpritesheet
1. 1. check spritesheet_index 0, 1, 2 returns correct + undefined if wrong index passed in
2. getSpritesheetInfo
2. 1. verify indexes 0, 1, 2, other return as expected
3. getSpriteLocation
3. 1. verify a few inputs return the correct outputs
3. 2. verify a couple out of bounds indexes work fine
3. 3. verify an incorrect spritesheet index is handled
4. getSpriteSheetTileWidth
4. 1. verify indexes 0, 1, 2, other return as expected
5. drawText
5. 1. verify text is drawn at correct location based on centered variable
6. getScores
6. 1. return correctly parsed scores object if exists
6. 2. return empty thingy when no available scores object
7. addScore
7. 1. verify if no score object, new one is created
7. 2. verify if 'won' is true, new run is pushed to
7. 3. verify if 'won' is false, the previous score is added back to the list


## Tech Debt

### game.js

1. replace drawSprite with drawSpriteWithSize
1. 1. both functions are very similar, drawSpriteWithSize is more flexible
2. draw function - split out drawing tiles, monsters, player, ui
3. tick - split out code to check for dead monsters, update the gamestate to dead, spawn new monsters
4. startGame - move level, score, gamestate to variables file
5. startLevel - move spawnRate, spawnCounter, player to variables file
6. drawScores - split out different sections to individual functions
