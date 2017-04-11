namespace TSAGame {
    export function setUp (state:Phaser.State, bg:string) {
        state.game.physics.startSystem(Phaser.Physics.ARCADE);
        state.game.world.resize(4000, 608);
        state.game.camera.bounds.bottom=600;
        state.game.time.advancedTiming=true;
     //   state.game.time.desiredFps =30;
        state.game.time.advancedTiming = true;
        state.game.add.sprite(0, 0, bg);
        TSAGame.alarmsOn=false;
        urgent=false;

    }export function pauseU(state:Phaser.State,resume:any,reset:any,instr:number,obot:any,tbot:any,drone:any,sensor:any,alien:any){
        
      //  if(instr==0){
            resume.alpha=1;
            reset.alpha=1;
            var mx = state.game.input.mousePointer.worldX;
            var my = state.game.input.mousePointer.worldY;
            if(mx>=resume.left&&mx<=resume.right&&my>=resume.top&&my<=resume.bottom &&state.game.input.activePointer.leftButton.isDown){
                 state.game.paused=false;
            }if(mx>=reset.left&&mx<=reset.right&&my>=reset.top&&my<=reset.bottom &&state.game.input.activePointer.leftButton.isDown){
                state.game.sound.stopAll();
                state.game.state.start("titleScreen", true, false);
                state.game.paused=false;

            }
  //      }
    }
    
}