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

2. getSpritesheetInfo
    1. verify indexes 0, 1, 2, other return as expected
3. getSpriteLocation
    1. verify a few inputs return the correct outputs
    2. verify a couple out of bounds indexes work fine
    3. verify an incorrect spritesheet index is handled
4. getSpriteSheetTileWidth
    1. verify indexes 0, 1, 2, other return as expected
5. drawText
    1. verify text is drawn at correct location based on centered variable
6. getScores
    1. return correctly parsed scores object if exists
    2. return empty thingy when no available scores object
7. addScore
    1. verify if no score object, new one is created
    2. verify if 'won' is true, new run is pushed to
    3. verify if 'won' is false, the previous score is added back to the list

### map.js

1. inBounds
    1. check in bounds as well as out of bounds in all directions
2. getTile
    1. if inbounds, check that it returns the necessary tile
    2. if out of bounds, check that it returns a wall tile

### monster.js

1. heal
    1. verify that healing to less than max hp heals that amount
    2. verify that healing at max hp heals to max hp
    3. verify that healing past max hp heals to max hp
2. update
    1. verify teleport counter is decremented
    2. verify if stunned, stunned is updated to false, returns
    3. verify if teleport count > 0, stunned is updated to false, returns
    4. verify if neither stunned nor teleport counter, doStuff() is called
3. doStuff
    1. if neighbors are all walls or monsters, do nothing
    2. if there is an available space, tryMove to that space is called
4. tryMove
    1. if destination is not passable, do nothing
    2. if destination does not have monster, call move function + return true
    3. if destination has a monster on it
        1. if both monsters are not player or both are player, do nothing + return true
        2. if one is player and one is monster, ensure attackedThisTurn is set to true, target monster is stunned, and target monster is hit + return true
5. hit
    1. remove hp from hp pool
    2. if hp < 0, call die
6. die
    1. set dead to true, remove monster from tile, change sprite index to dead sprite
7. move
    1. remove monster from old tile, set tile for new monster, call stepon function
8. Player.tryMove
    1. tick is called
9. Snake.doStuff
    1. super.doStuff is called twice
    2. if attackedThisTurn set to true during 1st doStuff, second doStuff isn't called
10. Goop.update
    1. if goop is not stunned, set stunned to true after update
11. Dragon.doStuff
    1. if next to floor space, consume floor and heal by .5
    2. if not next to floor space, call super.doStuff

### tile.js

1. replace
    1. tile that starts as one type is returned as a new type
2. dist
    1. get a couple examples and make sure they return expected values
3. Floor.stepOn
    1. if monster is not player, do nothing
    2. if floor is not treasure, do nothing
    3. if monster is player and floor is treasure then increment score, remove treasure, call spawnMonster
4. Exit.stepon
    1. if monster is not player, do nothing
    2. if level == num levels (and monster is player) then call addScore and showTitle
    3. if level <> num levels (and monster is player) then increment level and call startLevel

### util.js

1. rightPad
    1. idk what this function does, but it should be tested :)


## Tech Debt

### game.js

1. replace drawSprite with drawSpriteWithSize
    1. both functions are very similar, drawSpriteWithSize is more flexible
2. draw function - split out drawing tiles, monsters, player, ui
3. tick - split out code to check for dead monsters, update the gamestate to dead, spawn new monsters
4. startGame - move level, score, gamestate to variables file
5. startLevel - move spawnRate, spawnCounter, player to variables file
6. drawScores - split out different sections to individual functions

### map.js

1. generateLevel
    1. move treasure association to new function
2. inBounds - change numTiles to be a parameter