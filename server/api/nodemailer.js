const nodemailer = require('nodemailer')

const theSpaceJam =
  "Everybody get up it's time to slam now \nWe got a real jam goin' down \nWelcome to the Space Jam \nHere's your chance, do your dance at the Space Jam \nAlright.... \nCome on and slam, and welcome to the jam \nCome on and slam, if you wanna jam \nHey you, whatcha gonna do \nHey you, whatcha gonna do \nHey you, whatcha gonna do \nHey you, whatcha gonna do \nParty people in the house lets go \nIt's your boy Jay Ski a'ight so \nPass that thing and watch me flex \nBehind my back, you know what's next \nTo the jam, all in your face \nWassup, just feel the bass \nDrop it, rock it, down the room \nShake it, quake it, space KABOOM...\nJus Work that body, work that body \nMake sure you don't hurt no body \nGet wild and lose your mind \nTake this thing into over-time \nHey DJ, TURN IT UP \nQCD gon' burn it up \nC'mon y'all get on the floor \nSo hey, let's go a'ight \nEverybody get up it's time to slam now \nWe got a real jam goin' down \nWelcome to the Space Jam \nHere's your chance, do your dance at the Space Jam \nAlright.... \nWave your hands in the air if you feel fine \nWe're gonna take it into overtime \nWelcome to the Space Jam \nHere's your chance, do your dance at the Space Jam \nAlright... \nC'mon it's time to get hype say Whoop (there it is!) \nC'mon all the fellas say Whoop (there it is!) \nC'mon one time for the ladies say Whoop (there it is!) \nNow all the fellas say Whoop (there it is!) \nC'mon and run, baby run \nC'mon, C'mon, do it, run baby run \nYeah, you wanna hoop...so shoot, baby shoot \nC'mon and slam, and welcome to the jam \nC'mon and slam, if you wanna jam \nC'mon and slam, and welcome to the jam \nC'mon and slam, if you wanna jam \nSlam, Bam, Thank you ma'am \nGet on the floor and jam \nIf you see me on the microphone \nGirl you got me in a zone (Move) \nC'mon, C'mon and start the game (Move) \nBreak it down, tell me your name \nWe the team, I'm the coach \nLet's dance all night from coast to coast \nJust slide, from left to right \nJust slide, yourself enlight \nYou see me, drop the bass 3-1-1 all in your face \nJam on it, let's have some fun \nJam on it, \nOne on One \nYou run the 'O' and I run the 'D' \nSo C'mon baby just jam for me \nEverybody get up it's time to slam now \nWe got a real jam goin' down \nWelcome to the Space Jam \nHere's your chance, do your dance at the Space Jam \nAlright.... \nWave your hands in the air if you feel fine \nWe're gonna take it into overtime \nWelcome to the Space Jam \nHere's your chance, do your dance at the Space Jam \nAlright... \nHey ladies! (Yeah!) \nY'all ready to stop? (NO!) \nY'all wanna know why? (Why?) \nCuz it's a Slam Jam! \nFellas! (Yeah) \nY'all ready to stop? (NO!) \nY'all wanna know why? (Why?) \nIt's time to Slam Jam! \nEverybody get up it's time to slam now \nWe got a real jam goin' down \nWelcome to the Space Jam \nHere's your chance, do your dance at the Space Jam \nAlright.... \nWave your hands in the air if you feel fine \nWe're gonna take it into overtime \nWelcome to the Space Jam \nHere's your chance, do your dance at the Space Jam \nAlright... \nC'mon, everybody say 'Nah Nah Nah Nah Nah' \nC'mon, C'mon let me hear you say 'Hey ey ey O' \nC'mon, C'mon everybody 'Nah Nah Nah Nah Nah' \nJust take the time to say 'Hey ey ey O' \nCheck it out, Check it out \nY'all ready for this? (You know it!) \nNah...y'all ain't ready! \nY'all ready for this? (You know it!) \nC'mon check it out, Y'all ready to jam? (You know it!) \nNah...I, I don't think so \nY'all ready to jam? (You know it!) \nC'mon"

const mail = email => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'roumeshspacejam@gmail.com',
      pass: 'gracejammer1'
    }
  })

  let checkoutConfirm = {
    from: '"The Space Jam" <roumeshspacejam@gmail.com>',
    to: email,
    subject: "It's ya boy, Roumesh",
    text: theSpaceJam
  }

  transporter.sendMail(checkoutConfirm, error => {
    if (error) {
      return console.error(error)
    }
    console.log("we out here jammin', confirmation sent")
  })
}

module.exports = mail
