#!/bin/bash

cp -R index.html oryx_16bit_fantasy_creatures_trans.png oryx_16bit_fantasy_world_trans.png oryx_16bit_fantasy_items_trans.png ./js/ ./release

# remove require statements + references for release
# so the game can run without issues just from the index file
find ./release/js/ -type f -exec sed -i -e 's|const tile_req = require("../js/tile");||g' {} \;
find ./release/js/ -type f -exec sed -i -e 's|tile_req.||g' {} \;

find ./release/js/ -type f -exec sed -i -e 's|const vars_req = require("../js/vars");||g' {} \;
find ./release/js/ -type f -exec sed -i -e 's|vars_req.||g' {} \;

# find ./release/js/ -type f -exec sed -i -e 's|const tile = require("../js/tile");||g' {} \;
# find ./release/js/ -type f -exec sed -i -e 's|tile.||g' {} \;


