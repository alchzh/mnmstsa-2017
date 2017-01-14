Hey it's Albert:  
First make sure you have node 6.6  
`nvm install 6.6 && nvm use 6.6 && nvm alias default 6.6`
You will need typescript so `npm install -g typescript`  
and typings for defs so `npm install -g typings`  
and then run `typings install github:photonstorm/phaser/typescript/typings.json -GD`  
use `tsc -w` to compile
