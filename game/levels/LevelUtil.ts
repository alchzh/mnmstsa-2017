namespace TSAGame {
    export function setUp (state:Phaser.State, bg:string) {
        state.game.physics.startSystem(Phaser.Physics.ARCADE);
        state.game.world.resize(4000, 600);
        state.game.time.advancedTiming = true;
        state.game.add.sprite(0, 0, bg);
        TSAGame.alarmsOn=false;

    }export function pauseU(state:Phaser.State,resume:any,reset:any){
        
        resume.alpha=1;
        
        var mx = state.game.input.mousePointer.x;
        var my = state.game.input.mousePointer.y;
        if(mx>=resume.left&&mx<=resume.right&&my>=resume.top&&my<=resume.bottom &&state.game.input.activePointer.leftButton.isDown){
             state.game.paused=false;
        }if(mx>=reset.left&&mx<=reset.right&&my>=reset.top&&my<=reset.bottom &&state.game.input.activePointer.leftButton.isDown){
             state.game.paused=false;
        }
    }
    
}